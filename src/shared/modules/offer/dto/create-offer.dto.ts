import { Coords } from '../../../types/coords.type.js';
import { FacilitiesType } from '../../../types/facilities-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public date: string;
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
  public authorId: string;
  public commentsNum: number;
  public coords: Coords;
}
