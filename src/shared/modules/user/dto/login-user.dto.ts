import { IsEmail } from 'class-validator';
import { UserValidationMessage } from './user.message.js';

export class LoginUserDto {
  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  public password: string;
}
