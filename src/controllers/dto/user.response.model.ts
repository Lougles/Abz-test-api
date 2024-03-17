import { ApiProperty } from '@nestjs/swagger';

export class UserResponseModel {
  @ApiProperty({ example: 'true', required: true })
  success: boolean;

  @ApiProperty({ example: '1' })
  id: number;

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

  constructor(init?: Partial<UserResponseErrorModel>) {
    Object.assign(this, init);
  }
}
