/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { createProxyMiddleware } from "http-proxy-middleware";

import { AppModule } from "./app/app.module";
import { ConfigService } from "@training-app/service";
import process from "process";
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const port = getApiGatewayPort() || 3330;

  // Helmet
  app.use(helmet());


  // Proxy endpoints
  app.use(`/api/${process.env.CUSTOMER_SERVICE_NAME}`, createProxyMiddleware({
    changeOrigin: true,
    router: async () => {
      return await getUrlConfiguration('customerService', 3331);
    }
  }));

  app.use(`/api/${process.env.USER_SERVICE_NAME}`, createProxyMiddleware({
    changeOrigin: true,
    router: async () => {
      return await getUrlConfiguration('userService', 3332);
    }
  }));
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

function getUrlConfiguration(serviceName: string, defaultPort: number): Promise<any> {
  return new Promise((resolve, reject) => {
    resolve({
      protocol: `${new ConfigService().get("protocol")}:`,
      host: new ConfigService().get(serviceName).options.host || "0.0.0.0",
      port: new ConfigService().get(serviceName).options.port || defaultPort
    })
  })
}

function getApiGatewayPort(): any {
  return new ConfigService().get('port');
}

bootstrap();
