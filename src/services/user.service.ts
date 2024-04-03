import { EntityManager, FindManyOptions } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserRequestModel } from '../controllers/dto/user.request.model';
import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { TokenService } from './token.service';
import { ContentFileService } from './content.file.service';
import { PositionService } from './position.service';
import {
  CustomExceptions,
  CustomMessageExceptions,
} from '../utils/custom-validation.exception';
import { AllUserResponseModel } from '../controllers/dto/user.response.model';
import { DOMAIN_NAME, FULL_DOMAIN_NAME } from '../../config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly tokenService: TokenService,
    private readonly contentFileService: ContentFileService,
    private readonly positionService: PositionService,
  ) {}

  async onModuleInit() {
    await this.initTestUsers();
  }

  async initTestUsers() {
    const usersData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '..', '..', '..', 'users.json'),
        'utf8',
      ),
    );

    for (const userData of usersData) {
      const existingUser = await this.entityManager.findOne(User, {
        where: [{ email: userData.body.email }, { phone: userData.body.phone }],
      });
      if (!existingUser) {
        const userRequestModel: UserRequestModel = {
          name: userData.body.name,
          email: userData.body.email,
          phone: userData.body.phone,
          position_id: userData.body.position_id,
        };
        const photo = {
          fieldname: userData.photo.fieldname,
          originalname: userData.photo.originalname,
          encoding: userData.photo.encoding,
          mimetype: userData.photo.mimetype,
          destination: userData.photo.destination,
          filename: userData.photo.filename,
          path: userData.photo.path,
          size: userData.photo.size,
        };
        await this.create(
          photo as Express.Multer.File,
          userRequestModel,
          'dummy_token',
        );
      }
    }
  }

  async getPaginatedUsers(count, offset, page): Promise<AllUserResponseModel> {
    const options: FindManyOptions<User> = {
      order: {
        createdAt: 'DESC',
      },
      take: count,
      skip: offset !== null ? offset : page ? (page - 1) * count : 0,
      relations: {
        position: true,
        photo: true,
      },
    };

    const users = await this.entityManager.find(User, options);
    const totalUsers = await this.entityManager.count(User);

    const usersResponse = users.map(user => ({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      position: user.position.name,
      position_id: user.position.id.toString(),
      registration_timestamp: Math.floor(user.createdAt.getTime() / 1000),
      photo: `${DOMAIN_NAME}/${user.photo.path}`,
    }));

    const currentPage = Math.floor(options.skip / count) + 1;
    const nextPageOffset =
      currentPage * count < totalUsers ? currentPage * count : null;
    const prevPageOffset = currentPage > 1 ? (currentPage - 2) * count : null;

    const nextPageUrl =
      nextPageOffset !== null
        ? `${FULL_DOMAIN_NAME}/users/getAll?count=${count}&offset=${nextPageOffset}`
        : null;
    const prevPageUrl =
      prevPageOffset !== null
        ? `${FULL_DOMAIN_NAME}/users/getAll?count=${count}&offset=${prevPageOffset}`
        : null;

    return {
      success: true,
      page: currentPage,
      total_pages: Math.ceil(totalUsers / count),
      total_users: totalUsers,
      count: count,
      links: {
        next_url: nextPageUrl,
        prev_url: prevPageUrl,
      },
      users: usersResponse,
    };
  }

  async create(
    photo: Express.Multer.File,
    body: UserRequestModel,
    token: string,
  ) {
    const savedPhoto = await this.contentFileService.uploadFile(photo);
    if (!savedPhoto) return;
    if (isNaN(+body.position_id)) {
      throw new CustomExceptions(
        'The position id must be an integer.',
        'position_id',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const position = await this.positionService.findOne(+body.position_id);
    if (!position) {
      throw new CustomMessageExceptions(
        'position_id is not found!',
        HttpStatus.CONFLICT,
      );
    }
    const existingUser = await this.entityManager.findOne(User, {
      where: [{ email: body.email }, { phone: body.phone }],
    });
    if (existingUser) {
      throw new CustomExceptions(
        'User with this phone or email already exist!',
        'position_id',
        HttpStatus.CONFLICT,
      );
    }
    const createUser = new User();
    createUser.name = body.name;
    createUser.email = body.email;
    createUser.phone = body.phone;
    createUser.position = position;
    createUser.photo = savedPhoto;
    await this.entityManager.save(User, createUser);
    await this.tokenService.markTokenAsUsed(token);
    return {
      success: true,
      user_id: createUser.id,
      message: 'New user successfully registered',
    };
  }
}
