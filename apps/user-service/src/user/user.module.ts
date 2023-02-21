import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from "@training-app/service";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
