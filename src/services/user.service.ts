import { EntityManager } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUser } from '../controllers/dto/user.request.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(): Promise<User[]> {
    return await this.entityManager.find(User);
  }

  async create(body: CreateUser): Promise<User> {
    const createUser = new User();
    createUser.name = body.name;
    createUser.email = body.email;
    createUser.phone = body.phone;
    return createUser;
  }
}
