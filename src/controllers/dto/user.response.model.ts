import { ApiProperty } from '@nestjs/swagger';

export class UserResponseModel {
  @ApiProperty({ example: 'true', required: true })
  success: boolean;

  @ApiProperty({ example: '1' })
  user_id: number;

  @ApiProperty({ example: 'John', required: false })
  name: string;
}

export class UserResponseErrorModel {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 'Validation failed' })
  message: string;

  @ApiProperty({
    example: {
      name: ['The name must be at least 2 characters.'],
      email: ['The email must be a valid email address.'],
      phone: ['The phone field is required.'],
      position_id: ['The position id must be an integer.'],
      photo: [
        'The photo may not be greater than 5 Mbytes.',
        'Image is invalid.',
      ],
    },
    required: false,
    type: 'object',
  })
  fails?: Record<string, string[]>;
}

export const exampleUserResponseErrorModel: UserResponseErrorModel = {
  success: false,
  message: 'Validation failed',
  fails: {
    name: ['The name must be at least 2 characters.'],
    email: ['The email must be a valid email address.'],
    phone: ['The phone field is required.'],
    position_id: ['The position id must be an integer.'],
    photo: ['The photo may not be greater than 5 Mbytes.', 'Image is invalid.'],
  },
};

class UserResponse {
  @ApiProperty({ example: '30' })
  id: string;

  @ApiProperty({ example: 'Angel' })
  name: string;

  @ApiProperty({ example: 'angel.williams@example.com' })
  email: string;

  @ApiProperty({ example: '+380496540023' })
  phone: string;

  @ApiProperty({ example: 'Designer' })
  position: string;

  @ApiProperty({ example: '4' })
  position_id: string;

  @ApiProperty({ example: 1537777441 })
  registration_timestamp: number;

  @ApiProperty({
    example: 'https://site.com/images/users/5b977ba13fb3330.jpeg',
  })
  photo: string;
}
class LinksResponse {
  @ApiProperty({
    example: 'https://site.com/api/v1/users?page=2&count=5',
    nullable: true,
  })
  next_url: string | null;

  @ApiProperty({ example: null, nullable: true })
  prev_url: string | null;
}
export class AllUserResponseModel {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  total_pages: number;

  @ApiProperty({ example: 47 })
  total_users: number;

  @ApiProperty({ example: 5 })
  count: number;

  @ApiProperty({ type: LinksResponse })
  links: LinksResponse;

  @ApiProperty({ type: [UserResponse] })
  users: UserResponse[];
}
