import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from "@training-app/service";
import { UserResponse } from "./response/user.response";

@Injectable()
export class UserService{

  constructor(private readonly prismaService: PrismaService) {
  }

  async create(createUserDto: CreateUserDto) {
    const isEmailAvailable = await this.isEmailAvailable(createUserDto.email);
    const isUsernameAvailable = await this.isUsernameAvailable(createUserDto.username);
    if(isEmailAvailable)
      throw new BadRequestException(null, 'Email is available');

    if(isUsernameAvailable)
      throw new BadRequestException(null, 'Username is available');

    const createUser = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        username: createUserDto.username,
        password: createUserDto.password,
        birthDate: new Date(createUserDto.birthDate),
        address: createUserDto.address,
        image: createUserDto.image,
        phoneNumber: createUserDto.phoneNumber,
      }
    });
    return UserResponse.fromUserEntity(createUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique(({
      where: {id},
    }));
    return UserResponse.fromUserEntity(user);
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

  isUsernameAvailable(username: string) {
    return this.prismaService.user.findUnique(({
      where: {username: username.toLowerCase()},
      select: {username: true}
    }))
  }
}
