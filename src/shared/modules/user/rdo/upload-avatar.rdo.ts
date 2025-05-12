import {Expose} from 'class-transformer';

export default class UploadAvatar {
  @Expose()
  public filepath!: string;
}
