import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from './config/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // enables CORS for client
  app.enableCors({
    origin: config.CLIENT_URL, // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // Global Pipe for validation of incoming Request data and rejecting any unlisted data
  app.useGlobalPipes(

    new ValidationPipe({
      transform: true, // automatic transformation of data to DTOs
      forbidNonWhitelisted: true // rejects request if undefined properties exist
    })

  )

  await app.listen(3000);
}
bootstrap();
