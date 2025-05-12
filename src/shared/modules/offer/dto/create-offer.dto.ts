import { MinLength, MaxLength, IsDateString, IsInt, Max, Min, IsMongoId, IsArray, IsString, IsBoolean, IsEnum, IsObject } from 'class-validator';
import { Coords } from '../../../types/coords.type.js';
import { FacilitiesType } from '../../../types/facilities-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { OfferValidationMessage } from './offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: OfferValidationMessage.title.minLength })
  @MaxLength(100, { message: OfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: OfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: OfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: OfferValidationMessage.date.invalidFormat })
  public date: string;

  @IsString({ message: OfferValidationMessage.city.invalidFormat })
  public city: string;

  @IsString({ message: OfferValidationMessage.preview.invalidFormat })
  public preview: string;

  @IsArray({ message: OfferValidationMessage.photos.invalidFormat })
  public photos: string[];

  @IsBoolean({ message: OfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsBoolean({ message: OfferValidationMessage.isFavourite.invalidFormat })
  public isFavourite: boolean;

  @IsInt({ message: OfferValidationMessage.rate.invalidFormat })
  @Min(1, { message: OfferValidationMessage.rate.minValue })
  @Max(5, { message: OfferValidationMessage.rate.maxValue })
  public rate: number;

  @IsEnum(OfferType, { message: OfferValidationMessage.type.invalid })
  public type: OfferType;

  @IsInt({ message: OfferValidationMessage.roomsNum.invalidFormat })
  @Min(1, { message: OfferValidationMessage.roomsNum.minValue })
  @Max(8, { message: OfferValidationMessage.roomsNum.maxValue })
  public roomsNum: number;

  @IsInt({ message: OfferValidationMessage.personNum.invalidFormat })
  @Min(1, { message: OfferValidationMessage.personNum.minValue })
  @Max(10, { message: OfferValidationMessage.personNum.maxValue })
  public personNum: number;

  @IsInt({ message: OfferValidationMessage.rent.invalidFormat })
  @Min(1, { message: OfferValidationMessage.rent.minValue })
  @Max(100_000, { message: OfferValidationMessage.rent.maxValue })
  public rent: number;

  @IsArray({ message: OfferValidationMessage.facilities.invalidFormat })
  public facilities: FacilitiesType[];

  @IsMongoId({ message: OfferValidationMessage.authorId.invalidId })
  public authorId: string;

  @IsObject({ message: OfferValidationMessage.coords.invalidFormat })
  public coords: Coords;
}
