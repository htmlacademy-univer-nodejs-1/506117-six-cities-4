import { MinLength, MaxLength, IsEmail, IsEnum } from 'class-validator';
import { UserType } from '../../../types/user-type.enum.js';
import { UserValidationMessage } from './user.message.js';

export class CreateUserDto {
  @MinLength(1, { message: UserValidationMessage.name.minLength })
  @MaxLength(15, { message: UserValidationMessage.name.maxLength })
  public name: string;

  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  public avatar: string;

  @MinLength(6, { message: UserValidationMessage.password.minLength })
  @MaxLength(12, { message: UserValidationMessage.password.maxLength })
  public password: string;

  @IsEnum(UserType, { message: UserValidationMessage.type.invalidFormat })
  public type: UserType;
}
