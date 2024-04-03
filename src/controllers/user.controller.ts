import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageFileInterceptor } from '../utils/file.interceptor';
import {
  AllUsersRequestModel,
  UserRequestModel,
} from './dto/user.request.model';
import { UserService } from '../services/user.service';
import {
  AllUserResponseModel,
  exampleUserResponseErrorModel,
  UserResponseErrorModel,
  UserResponseModel,
} from './dto/user.response.model';
import { PhotoValidationInterceptor } from '../utils/photo.validation.interceptor';
import { CustomTokenException } from '../utils/custom-validation.exception';
import { TokenService } from '../services/token.service';
import { ValidToken } from '../utils/valid-token.decorator';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Get('getAll')
  async getAllUsers(
    @Query() query: AllUsersRequestModel,
  ): Promise<AllUserResponseModel> {
    const page = query.page ? parseInt(query.page, 10) : 0;
    const count = query.count ? parseInt(query.count, 10) : 10;
    const offset = query.offset ? parseInt(query.offset, 10) : page * count;
    const getAllUsers = await this.userService.getPaginatedUsers(
      count,
      offset,
      page,
    );
    return getAllUsers;
  }

  @ApiResponse({
    status: 200,
    description: 'Створення користувача',
    type: UserResponseModel,
  })
  @Post('create')
  @UseInterceptors(ImageFileInterceptor('photo'), PhotoValidationInterceptor)
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      example: exampleUserResponseErrorModel,
    },
  })
  async createUser(
    @UploadedFile() photo: Express.Multer.File,
    @Body() body: UserRequestModel,
    @ValidToken() authToken: string,
  ): Promise<UserResponseModel | UserResponseErrorModel> {
    const checkedToken = await this.validateToken(authToken);
    const { success, user_id, message } = await this.userService.create(
      photo,
      body,
      checkedToken,
    );
    return { success, user_id, message };
  }
  private async validateToken(token: string): Promise<string> {
    const checkedToken = await this.tokenService.getToken(token);
    const TOKEN_EXPIRATION_TIME = 40 * 60 * 1000;
    if (!checkedToken) {
      throw new CustomTokenException('The token already used or incorrect.');
    }
    if (Date.now() - checkedToken.createdAt.getTime() > TOKEN_EXPIRATION_TIME) {
      throw new CustomTokenException('The token expired.');
    }
    return checkedToken.token;
  }
}
