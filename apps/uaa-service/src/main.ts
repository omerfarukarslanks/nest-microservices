/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import process from "process";
import helmet from "helmet";
import { KafkaOptions } from "@nestjs/microservices";
import { loadConfigJson, loadKafkaOption, MicroServiceConfiguration } from "@training-app/service";

const config: MicroServiceConfiguration = loadConfigJson();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const globalPrefix = config.GLOBAL_API_PREFIX;
  // // Setup kafka server for api
  const options: KafkaOptions = await loadKafkaOption(config);
  app.connectMicroservice(options);
  app.startAllMicroservices();


  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  const port = config.HTTP_PORT || process.env.HTTP_PORT || 8003;
  // Helmet
  app.use(helmet());
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
