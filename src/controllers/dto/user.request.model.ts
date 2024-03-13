import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUser {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Length(2, 60, { message: 'Name must be 2-60 characters long' })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @Length(2, 100, { message: 'Email must be 2-100 characters long' })
  email: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+380123456789',
  })
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^\+380([0-9]{9})$/, {
    message: 'Phone number must start with +380 and be followed by 9 digits',
  })
  phone: string;

  @ApiProperty({
    description: 'User position id',
    example: 1,
  })
  @IsInt({ message: 'Position ID must be an integer' })
  @Min(1, { message: 'Position ID must be at least 1' })
  @IsNotEmpty({ message: 'Position ID is required' })
  position_id: number;
}
