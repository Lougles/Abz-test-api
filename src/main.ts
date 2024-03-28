import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { UserResponseErrorModel } from './controllers/dto/user.response.model';
import { CustomValidationException } from './utils/custom-validation.exception';
import { PORT } from '../config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Abz-Project')
    .setDescription('The Abz Test Assignment API description')
    .setVersion('1.0')
    .addTag('Abz API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
      const validationErrors = {};
      errors.forEach((error) => {
        validationErrors[error.property] = Object.values(error.constraints);
      });
      throw new CustomValidationException({
        success: false,
        message: "Validation failed",
        fails: validationErrors
      });
    },
  }));

  // app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('api/v1');

  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
