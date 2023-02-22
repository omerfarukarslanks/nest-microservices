import { Injectable } from "@nestjs/common";
import * as process from "process";

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
   this.envConfig = {};
   this.envConfig.port = process.env.API_GATEWAY_PORT;
   this.envConfig.protocol = process.env.PROTOCOL

    this.envConfig.customerService = {
      options: {
        port: process.env.CUSTOMER_SERVICE_PORT,
        host: process.env.CUSTOMER_SERVICE_HOST,
      }
    };

   this.envConfig.userService = {
     options: {
       port: process.env.USER_SERVICE_PORT,
       host: process.env.USER_SERVICE_HOST,
     }
   };

  }

  get(key: string): any {
    return this.envConfig[key];
  }

}
