import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User } from '../../types/user.type.js';
import { UserType } from '../../types/user-type.enum.js';
import { createSHA256 } from '../../helpers/database.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    minlength: 1,
    maxlength: 15,
    default: 'unknown'
  })
  public name: string;

  @prop({
    required: true,
    match: /.+@.+\..+/,
    default: ''
  })
  public email: string;

  @prop({
    required: false,
  })
  public avatar: string;

  @prop({
    required: true,
    minlength: 6,
    maxlength: 1024
  })
  private password?: string;

  @prop({
    required: true,
    type: () => String,
    enum: UserType,
    default: UserType.Standard
  })
  public type: UserType;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
