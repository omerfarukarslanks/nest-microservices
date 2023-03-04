import { IsDate, IsEmpty, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty({})
  email: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @MinLength(8, {message: 'user.passwordLenghtAlertMessage'})
  password: string;
  phoneNumber: string;
  image: string;
  address: string;
  birthDate: any;
  permissions: Array<any>;
}
