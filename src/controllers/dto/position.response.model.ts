import { ApiProperty } from '@nestjs/swagger';

export class PositionResponseModel {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: 'Security' })
  name: string;
}
