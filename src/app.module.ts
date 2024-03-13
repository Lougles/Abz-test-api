import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CONFIG_DB_HOST,
  CONFIG_DB_NAME,
  CONFIG_DB_PASSWORD,
  CONFIG_DB_PORT,
  CONFIG_DB_USERNAME,
} from '../config';
import { TokenEntity } from './entity/token.entity';
import { TokenService } from './services/token.service';
import { TokenController } from './controllers/token.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: CONFIG_DB_HOST,
      port: CONFIG_DB_PORT,
      username: CONFIG_DB_USERNAME,
      password: CONFIG_DB_PASSWORD,
      database: CONFIG_DB_NAME,
      entities: [TokenEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController, TokenController],
  providers: [AppService, TokenService],
})
export class AppModule {}
