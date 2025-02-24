import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { resolve } from 'node:path';
import { Offer } from '../../types/offer.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { FacilitiesType } from '../../types/facilities-type.enum.js';
import { Coords } from '../../types/coords.type.js';
import { UserType } from '../../types/user-type.enum.js';

function parseCoords(coordsString: string): Coords {
  const [latitude, longitude] = coordsString.split(',');
  return {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude)
  };
}

export class TSVFileReader implements FileReader {
  private stringData = '';

  constructor(
    public readonly filePath: string
  ) { }

  public read(): void {
    this.stringData = readFileSync(resolve(this.filePath), { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    return this.stringData.split('\n')
      .filter((row) => row.trim().length > 0)
      .map((row) => row.split('\t'))
      .map(([
        title,
        description,
        date,
        city,
        preview,
        photos,
        isPremium,
        isFavourite,
        rate,
        offerType,
        roomsNum,
        personNum,
        rent,
        facilities,
        commentsNum,
        coords,
        name,
        email,
        avatar,
        password,
        userType
      ]) => ({
        title,
        description,
        date: new Date(date),
        city,
        preview,
        photos: photos.split(','),
        isPremium: isPremium === 'true',
        isFavourite: isFavourite === 'true',
        rate: parseFloat(rate),
        type: OfferType[offerType as keyof typeof OfferType],
        roomsNum: parseInt(roomsNum, 10),
        personNum: parseInt(personNum, 10),
        rent: parseFloat(rent),
        facilities: facilities.split(',').map((facility) => FacilitiesType[facility as keyof typeof FacilitiesType]),
        commentsNum: parseInt(commentsNum, 10),
        coords: parseCoords(coords),
        author: {
          name,
          email,
          avatar,
          password,
          type: UserType[userType as keyof typeof UserType]
        }
      }));
  }
}
