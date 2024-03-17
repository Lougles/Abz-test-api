import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageFileInterceptor } from '../utils/file.interceptor';
import { UserRequestModel } from './dto/user.request.model';
import { UserService } from '../services/user.service';
import {
  UserResponseErrorModel,
  UserResponseModel,
} from './dto/user.response.model';
import { PhotoValidationInterceptor } from '../utils/photo.validation.interceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getAllUsers() {}

  @Post('create')
  @UseInterceptors(ImageFileInterceptor('photo'), PhotoValidationInterceptor)
  async createUser(
    @UploadedFile() photo: Express.Multer.File,
    @Body() body: UserRequestModel,
    // ): Promise<UserResponseModel | UserResponseErrorModel> {
  ) {
    console.log(body);
    console.log(photo);
    // try {
    //   // Attempt to create the user with the provided photo and body
    //   const createUserResult = await this.userService.create(photo, body);
    //
    //   // You might have some logic to determine if the creation was successful
    //   // For now, let's assume the result has a 'success' property
    //   if (createUserResult.success) {
    //     return createUserResult;
    //   } else {
    //     // Return an error response if not successful
    //     throw new YourCustomException(createUserResult);
    //   }
    // } catch (error) {
    //   // If there's an error, you can format and throw a custom exception
    //   // that your Global Exception Filter will catch and format for the response
    //   throw new YourCustomException({
    //     success: false,
    //     message: 'Your error message here',
    //     fails: error.details, // This should be structured as per your requirements
    //   });
    // }
  }
}
