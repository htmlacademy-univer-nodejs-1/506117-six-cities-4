import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Offer } from '../../types/offer.type.js';
import { Coords } from '../../types/coords.type.js';
import { FacilitiesType } from '../../types/facilities-type.enum.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { User } from '../../types/user.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({
    required: true,
    minlength: 10,
    maxlength: 100
  })
  public title: string;

  @prop({
    required: true,
    minlength: 20,
    maxlength: 1024
  })
  public description: string;

  @prop({
    required: true
  })
  public date: Date;

  @prop({
    required: true
  })
  public city: string;

  @prop({
    required: true
  })
  public preview: string;

  @prop({
    required: true
  })
  public photos: string[];

  @prop({
    required: true
  })
  public isPremium: boolean;

  @prop({
    required: true
  })
  public isFavourite: boolean;

  @prop({
    required: true
  })
  public rate: number;

  @prop({
    required: true
  })
  public type: OfferType;

  @prop({
    required: true,
    min: 1,
    max: 8
  })
  public roomsNum: number;

  @prop({
    required: true,
    min: 1,
    max: 10
  })
  public personNum: number;

  @prop({
    required: true,
    min: 100,
    max: 100_000
  })
  public rent: number;

  @prop({
    required: true
  })
  public facilities: FacilitiesType[];

  @prop({
    required: true
  })
  public author: User;

  @prop({
    required: false
  })
  public commentsNum: number;

  @prop({
    required: true
  })
  public coords: Coords;

  constructor(offer: Offer) {
    super();

    this.title = offer.title;
    this.description = offer.description;
    this.date = offer.date;
    this.city = offer.city;
    this.preview = offer.preview;
    this.photos = offer.photos;
    this.isPremium = offer.isPremium;
    this.isFavourite = offer.isFavourite;
    this.rate = offer.rate;
    this.type = offer.type;
    this.roomsNum = offer.roomsNum;
    this.personNum = offer.personNum;
    this.rent = offer.rent;
    this.facilities = offer.facilities;
    this.author = offer.author;
    this.commentsNum = offer.commentsNum;
    this.coords = offer.coords;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
