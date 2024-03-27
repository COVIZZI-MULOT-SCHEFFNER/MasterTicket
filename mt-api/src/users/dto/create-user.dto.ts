export class CreateUserDto {
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly phone: string;
    password: string;
    readonly role: string;
  }