import { ApiProperty } from '@nestjs/swagger';

export class UserResponseModel {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: 'John', required: false })
  name: string;
}
