import { User } from "../entities/user.entity";

export class UserResponse {
  id: number;
  name: string;
  email: string;

  static fromUserEntity(entity: User): UserResponse {
    const response = new UserResponse();
    response.id = entity.id;
    response.name = entity.name;
    response.email = entity.email;
    return response;
  }
}
