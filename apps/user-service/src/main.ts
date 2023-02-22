/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/user-service';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.USER_SERVICE_PORT || 3332;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
