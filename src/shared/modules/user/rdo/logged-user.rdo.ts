import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public name: string;
}
