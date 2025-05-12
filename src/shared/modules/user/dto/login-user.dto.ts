import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { UserValidationMessage } from './user.message.js';

export class LoginUserDto {
  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @MinLength(10, { message: UserValidationMessage.password.minLength })
  @MaxLength(100, { message: UserValidationMessage.password.maxLength })
  public password: string;
}
