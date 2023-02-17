/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3330;
  const CUSTOMER_SERVICE_URL = "http://localhost:3331";
  const USER_SERVICE_URL = "http://localhost:3332";

  // Proxy endpoints
  app.use('/api/users', createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
  }));
  app.use('/api/customers', createProxyMiddleware({
    target: CUSTOMER_SERVICE_URL,
    changeOrigin: true,
  }));
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
