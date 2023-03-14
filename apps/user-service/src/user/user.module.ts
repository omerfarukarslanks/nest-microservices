import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from "@training-app/service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
            brokers: ['localhost:29092'],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'user-consumer'
          }
        }
      },
    ]),
  ]
})
export class UserModule {}
