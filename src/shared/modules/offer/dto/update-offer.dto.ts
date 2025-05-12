import { MinLength, MaxLength, IsDateString, IsString, IsArray, IsBoolean, IsInt, Min, Max, IsEnum, IsObject, IsOptional } from 'class-validator';
import { Coords } from '../../../types/coords.type.js';
import { FacilitiesType } from '../../../types/facilities-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { OfferValidationMessage } from './offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: OfferValidationMessage.title.minLength })
  @MaxLength(100, { message: OfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: OfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: OfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: OfferValidationMessage.date.invalidFormat })
  public date?: string;

  @IsOptional()
  @IsString({ message: OfferValidationMessage.city.invalidFormat })
  public city?: string;

  @IsOptional()
  @IsString({ message: OfferValidationMessage.preview.invalidFormat })
  public preview?: string;

  @IsOptional()
  @IsArray({ message: OfferValidationMessage.photos.invalidFormat })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: OfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: OfferValidationMessage.isFavourite.invalidFormat })
  public isFavourite?: boolean;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.rate.invalidFormat })
  @Min(1, { message: OfferValidationMessage.rate.minValue })
  @Max(5, { message: OfferValidationMessage.rate.maxValue })
  public rate?: number;

  @IsOptional()
  @IsEnum(OfferType, { message: OfferValidationMessage.type.invalid })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.roomsNum.invalidFormat })
  @Min(1, { message: OfferValidationMessage.roomsNum.minValue })
  @Max(8, { message: OfferValidationMessage.roomsNum.maxValue })
  public roomsNum?: number;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.personNum.invalidFormat })
  @Min(1, { message: OfferValidationMessage.personNum.minValue })
  @Max(10, { message: OfferValidationMessage.personNum.maxValue })
  public personNum?: number;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.rent.invalidFormat })
  @Min(1, { message: OfferValidationMessage.rent.minValue })
  @Max(100_000, { message: OfferValidationMessage.rent.maxValue })
  public rent?: number;

  @IsOptional()
  @IsArray({ message: OfferValidationMessage.facilities.invalidFormat })
  public facilities?: FacilitiesType[];

  @IsOptional()
  @IsObject({ message: OfferValidationMessage.coords.invalidFormat })
  public coords?: Coords;
}

