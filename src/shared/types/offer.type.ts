import { Coords } from './coords.type.js';
import { FacilitiesType } from './facilities-type.enum.js';
import { OfferType } from './offer-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: string;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavourite: boolean;
  rate: number;
  type: OfferType;
  roomsNum: number;
  personNum: number;
  rent: number;
  facilities: FacilitiesType[];
  author: User;
  commentsNum: number;
  coords: Coords;
}
