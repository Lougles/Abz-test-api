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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: CONFIG_DB_HOST,
      port: CONFIG_DB_PORT,
      username: CONFIG_DB_USERNAME,
      password: CONFIG_DB_PASSWORD,
      database: CONFIG_DB_NAME,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
