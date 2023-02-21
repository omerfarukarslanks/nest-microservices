import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from "@training-app/service";
import { UserResponse } from "./response/user.response";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async create(createUserDto: CreateUserDto) {
    const isEmailAvailable = await this.isEmailAvailable(createUserDto.email);

    if(isEmailAvailable)
      throw new BadRequestException(null, 'Email is available');

    const createUser = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email
      }
    });
    return UserResponse.fromUserEntity(createUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  isEmailAvailable(email: string) {
    return this.prismaService.user.findUnique(({
      where: {email: email.toLowerCase()},
      select: {email: true}
    }));
  }
}
