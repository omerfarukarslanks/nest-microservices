/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import { GatewayConfiguration, loadConfigJson, loadGatewayProxyConfig } from "@training-app/service";
import process from "process";
import helmet from 'helmet';

// Load config.json file
const config: GatewayConfiguration = loadConfigJson();
async function bootstrap() {
  let app = await NestFactory.create(AppModule, {cors: true});
  const globalPrefix = config.GLOBAL_API_PREFIX;
  app.setGlobalPrefix(globalPrefix);
  app = await loadGatewayProxyConfig(app, config);
  const httpPort = config.HTTP_PORT || process.env.HTTP_PORT || 8010;

  // Helmet
  app.use(helmet());


  await app.listen(httpPort);
  Logger.log(
    `🚀 Application is running on: http://localhost:${httpPort}/${globalPrefix}`
  );
}

bootstrap();
