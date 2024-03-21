import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { randomBytes } from 'crypto';
import { Token } from '../entity/token.entity';

@Injectable()
export class TokenService {
  constructor(private readonly EntityManager: EntityManager) {}

  async generateToken() {
    const token = new Token();
    token.token = randomBytes(32).toString('hex');
    token.createdAt = new Date();
    token.isUsed = false;
    await this.EntityManager.save(token);
    return token.token;
  }

  async getToken(token: string): Promise<Token | undefined> {
    const get = await this.EntityManager.findOne(Token, {
      where: { token, isUsed: false },
    });
    return get;
  }

  async markTokenAsUsed(tokenString: string): Promise<void> {
    const token = await this.EntityManager.findOne(Token, {
      where: { token: tokenString },
    });
    if (token) {
      token.isUsed = true;
      await this.EntityManager.save(token);
    }
  }
}
