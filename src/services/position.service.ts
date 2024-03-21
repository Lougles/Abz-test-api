import { EntityManager } from 'typeorm';
import { Position } from '../entity/position.entity';
import { Injectable } from '@nestjs/common';
import { PositionResponseModel } from '../controllers/dto/position.response.model';

@Injectable()
export class PositionService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(): Promise<PositionResponseModel[]> {
    const positions = await this.entityManager.find(Position, {});
    return positions;
  }

  async findOne(id: number): Promise<Position> {
    return await this.entityManager.findOne(Position, { where: { id: id } });
  }

  async addPosition(newPosition: string): Promise<PositionResponseModel> {
    const createPosition = new Position();
    createPosition.name = newPosition;
    await this.entityManager.save(createPosition);
    return createPosition;
  }
}
