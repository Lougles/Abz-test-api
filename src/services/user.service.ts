import { EntityManager } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserRequestModel } from '../controllers/dto/user.request.model';
import { Injectable } from '@nestjs/common';
import { TokenService } from './token.service';

@Injectable()
export class UserService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly tokenService: TokenService,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.entityManager.find(User);
  }

  async create(photo, body: UserRequestModel) {
    let message: string;
    const checkToken = await this.tokenService.getToken(body.email);
    if (!checkToken) {
      message = 'No token';
    }
    const createUser = new User();
    createUser.name = body.name;
    createUser.email = body.email;
    createUser.phone = body.phone;
    await this.entityManager.save(User, createUser);
    return {
      success: true,
      message: message,
    };
  }
}
