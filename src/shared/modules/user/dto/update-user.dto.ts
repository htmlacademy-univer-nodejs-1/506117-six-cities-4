import { MinLength, MaxLength, IsOptional } from 'class-validator';
import { UserValidationMessage } from './user.message.js';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(1, { message: UserValidationMessage.name.minLength })
  @MaxLength(15, { message: UserValidationMessage.name.maxLength })
  public name?: string;

  @IsOptional()
  public avatar?: string;
}
