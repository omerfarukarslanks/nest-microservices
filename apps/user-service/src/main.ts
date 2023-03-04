/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import process from "process";
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true,
    logger: ['error', 'warn', 'debug'], bufferLogs: true});
  app.useGlobalPipes(new ValidationPipe());
  const globalPrefix = 'api/user-service';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.USER_SERVICE_PORT || 3332;

  // Helmet
  app.use(helmet());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
