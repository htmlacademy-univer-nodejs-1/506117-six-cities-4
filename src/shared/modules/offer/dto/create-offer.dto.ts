import { Coords } from '../../../types/coords.type.js';
import { FacilitiesType } from '../../../types/facilities-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { User } from '../../../types/user.type.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public date: Date;
  public city: string;
  public preview: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavourite: boolean;
  public rate: number;
  public type: OfferType;
  public roomsNum: number;
  public personNum: number;
  public rent: number;
  public facilities: FacilitiesType[];
  public author: User;
  public commentsNum: number;
  public coords: Coords;
}
