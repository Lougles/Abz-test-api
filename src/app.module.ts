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
import { ContentFileService } from './services/content.file.service';
import { User } from './entity/user.entity';
import { ContentFile } from './entity/content.file.entity';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'user'),
      serveRoot: '/user/',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: CONFIG_DB_HOST,
      port: CONFIG_DB_PORT,
      username: CONFIG_DB_USERNAME,
      password: CONFIG_DB_PASSWORD,
      database: CONFIG_DB_NAME,
      entities: [Token, Position, User, ContentFile],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [TokenController, PositionController, UserController],
  providers: [TokenService, PositionService, UserService, ContentFileService],
})
export class AppModule {}
