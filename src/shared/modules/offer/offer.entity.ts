import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Coords } from '../../types/coords.type.js';
import { FacilitiesType } from '../../types/facilities-type.enum.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
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
    type: () => String,
    enum: OfferType,
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
    type: () => String,
    enum: FacilitiesType,
    required: true
  })
  public facilities: FacilitiesType[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public authorId!: Ref<UserEntity>;

  @prop({
    required: false,
    default: 0
  })
  public commentsNum: number;

  @prop({
    required: true
  })
  public coords: Coords;
}

export const OfferModel = getModelForClass(OfferEntity);
