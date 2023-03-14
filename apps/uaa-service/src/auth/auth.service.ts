import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {


  constructor() {
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: number) {
    return null;
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
}
