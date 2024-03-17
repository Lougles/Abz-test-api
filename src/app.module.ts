import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CONFIG_DB_HOST,
  CONFIG_DB_NAME,
  CONFIG_DB_PASSWORD,
  CONFIG_DB_PORT,
  CONFIG_DB_USERNAME,
} from '../config';
import { Token } from './entity/token.entity';
import { TokenService } from './services/token.service';
import { TokenController } from './controllers/token.controller';
import { Position } from './entity/position.entity';
import { PositionController } from './controllers/position.controller';
import { PositionService } from './services/position.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: CONFIG_DB_HOST,
      port: CONFIG_DB_PORT,
      username: CONFIG_DB_USERNAME,
      password: CONFIG_DB_PASSWORD,
      database: CONFIG_DB_NAME,
      entities: [Token, Position],
      synchronize: true,
    }),
  ],
  controllers: [TokenController, PositionController, UserController],
  providers: [TokenService, PositionService, UserService],
})
export class AppModule {}
