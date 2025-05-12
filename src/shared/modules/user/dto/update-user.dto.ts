import { MinLength, MaxLength } from 'class-validator';
import { UserValidationMessage } from './user.message.js';

export class UpdateUserDto {
  @MinLength(10, { message: UserValidationMessage.name.minLength })
  @MaxLength(100, { message: UserValidationMessage.name.maxLength })
  public name: string;

  public avatar: string;
}
