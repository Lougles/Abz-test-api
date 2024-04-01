import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRequestModel {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Length(2, 60, { message: 'Name must be 2-60 characters long' })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @Length(2, 100, { message: 'Email must be 2-100 characters long' })
  email: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+380123456789',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^\+380([0-9]{9})$/, {
    message: 'User phone number. Number should start with code of Ukraine +380',
  })
  phone: string;

  @ApiProperty({
    description: 'User position id',
    example: 1,
    required: true,
  })
  // @IsInt({ message: 'Position ID must be an integer' })
  // @Min(1, { message: 'Position ID must be at least 1' })
  @IsNotEmpty({ message: 'Position ID is required' })
  position_id: number;
}

export class AllUsersRequestModel {
  @ApiProperty({
    description: 'Specify the page that you want to retrieve',
    example: 1,
    minimum: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  page: string;

  @ApiProperty({
    description: 'Specify the missing record number',
    example: 0,
    minimum: 0,
    default: 0,
    required: false,
  })
  @IsOptional()
  offset: string;

  @ApiProperty({
    description: 'Specify the amount of items that will be retrieved per page',
    example: 5,
    default: 5,
    minimum: 1,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  count: string;
}
