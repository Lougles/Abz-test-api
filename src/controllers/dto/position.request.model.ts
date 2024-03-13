import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class PositionRequestModel {
  @ApiProperty({
    description: 'Position name',
    example: 'Security',
  })
  @IsString()
  @IsNotEmpty({ message: 'position name is required' })
  @Length(2, 20, { message: 'Position must be 2-20 characters long' })
  position: string;
}
