import { Expose } from 'class-transformer';

export class PreviewOfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public preview: string;

  @Expose()
  public rate: number;

  @Expose()
  public rent: number;

  @Expose()
  public type: string;
}
