export class CreateUserDto {
  name: string;
  email: string;
  address: string;
  password: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}
