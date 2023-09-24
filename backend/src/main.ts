import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {

  // Load environment variables from .env file
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // Replace with your React app's URL
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
