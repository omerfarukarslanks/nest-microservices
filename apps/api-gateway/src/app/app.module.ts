import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ThrottlerModule } from "@nestjs/throttler";
import process from "process";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        ttl: +process.env.TTL,
        limit: +process.env.LIMIT
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
