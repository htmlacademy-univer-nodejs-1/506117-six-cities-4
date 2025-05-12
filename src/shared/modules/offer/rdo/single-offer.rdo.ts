import { Expose, Type } from 'class-transformer';
import { Coords } from '../../../types/coords.type.js';
import { FacilitiesType } from '../../../types/facilities-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class SingleOfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public date: string;

  @Expose()
  public city: string;

  @Expose()
  public preview: string;

  @Expose()
  public photos: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavourite: boolean;

  @Expose()
  public rate: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public roomsNum: number;

  @Expose()
  public personNum: number;

  @Expose()
  public rent: number;

  @Expose()
  public facilities: FacilitiesType[];

  @Expose({ name: 'authorId'})
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  public commentsNum: number;

  @Expose()
  public coords: Coords;
}
