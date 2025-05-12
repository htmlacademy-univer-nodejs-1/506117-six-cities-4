import { MinLength, MaxLength, IsEmail, IsEnum } from 'class-validator';
import { UserType } from '../../../types/user-type.enum.js';
import { UserValidationMessage } from './user.message.js';

export class CreateUserDto {
  @MinLength(10, { message: UserValidationMessage.name.minLength })
  @MaxLength(100, { message: UserValidationMessage.name.maxLength })
  public name: string;

  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  public avatar: string;

  @MinLength(10, { message: UserValidationMessage.password.minLength })
  @MaxLength(100, { message: UserValidationMessage.password.maxLength })
  public password: string;

  @IsEnum({ message: UserValidationMessage.type.invalidFormat })
  public type: UserType;
}
