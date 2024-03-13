import { Body, Controller, Get, Post } from '@nestjs/common';
import { PositionService } from '../services/position.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PositionRequestModel } from './dto/position.request.model';
import { PositionResponseModel } from './dto/position.response.model';

@ApiTags('Positions')
@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @ApiResponse({
    status: 200,
    description: 'Get list of positions',
    type: PositionResponseModel,
    isArray: true,
  })
  @Get('all')
  async getAllPositions(): Promise<{
    success: boolean;
    positions: PositionResponseModel[];
  }> {
    const allPositions = await this.positionService.getAll();
    return {
      success: true,
      positions: allPositions,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'Create new Position',
    type: PositionResponseModel,
  })
  @Post('add')
  async addPosition(
    @Body() body: PositionRequestModel,
  ): Promise<PositionResponseModel> {
    const createPosition = await this.positionService.addPosition(
      body.position,
    );
    return createPosition;
  }
}
