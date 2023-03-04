import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientKafka, EventPattern, Payload } from "@nestjs/microservices";

@Injectable()
export class AuthService implements OnModuleInit {

  authClient: ClientKafka;

  constructor(@Inject('AUTH_SERVICE') authClient: ClientKafka) {
    this.authClient = authClient;
  }

  async onModuleInit() {
    await this.authClient.connect();
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: number) {
    this.authClient.emit('get_find_one_user', {id});
    const user = await this.handleFindOneUser();
    return user;
/*    const user = await this.validateUser('Patates.Arslan', '12345')
    return user;*/
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

/*  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(1)
    return user;
  }*/

  @EventPattern('send_find_one_user')
  handleFindOneUser(@Payload() user?: any) {
    return user;
  }
}
