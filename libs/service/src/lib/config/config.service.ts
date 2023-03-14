import { INestApplication } from "@nestjs/common";
import * as process from "process";
import * as fs from "fs";
import { join } from "path";
import { GatewayConfiguration, MicroServiceConfiguration } from "./config.model";
import { createProxyMiddleware } from "http-proxy-middleware";
import { KafkaOptions, Transport } from "@nestjs/microservices";

export const loadConfigJson = (message = "[LOAD] config.json file"): MicroServiceConfiguration | GatewayConfiguration => {
  let config: any = process.env.config;
  if (!config) {
    console.log(`${message}:`, `${__dirname}\\environments\\config.json`);
    const jsonFile = fs.readFileSync(join(__dirname, "environments", "config.json"), "utf8");
    process.env.config = jsonFile;
    config = JSON.parse(jsonFile);
  } else {
    config = JSON.parse(process.env.config as any);
  }
  return config;
};

export function loadGatewayProxyConfig(app: INestApplication, config: GatewayConfiguration) {
  if (config) {
    app.use(config.CUSTOMER.GLOBAL_API_PREFIX, createProxyMiddleware({
      changeOrigin: true,
      router: async () => {
        return await getUrlConfiguration(config.CUSTOMER);
      }
    }));

    app.use(config.USER.GLOBAL_API_PREFIX, createProxyMiddleware({
      changeOrigin: true,
      router: async () => {
        return await getUrlConfiguration(config.USER);
      }
    }));

    app.use(config.UAA.GLOBAL_API_PREFIX, createProxyMiddleware({
      changeOrigin: true,
      router: async () => {
        return await getUrlConfiguration(config.UAA);
      }
    }));
  }
  return app;
}

export function loadKafkaOption(conf: MicroServiceConfiguration): Promise<KafkaOptions> {
  return new Promise<KafkaOptions>(resolve => {
    resolve({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: conf.REVERSE_CONTEXT,
          brokers: [`${conf.KAFKA_HOST}:${conf.KAFKA_PORT}`]
        },
        consumer: {
          groupId: conf.GROUP_ID
        }
      }
    });
  });
}

export function getUrlConfiguration(conf: MicroServiceConfiguration): Promise<any> {
  return new Promise((resolve, reject) => {
    resolve({
      protocol: conf.PROTOCOL,
      host: conf.HTTP_HOST,
      port: conf.HTTP_PORT
    });
  });
}
