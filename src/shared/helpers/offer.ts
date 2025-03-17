import { Coords, FacilitiesType, Offer, OfferType, UserType } from '../types/index.js';

function parseCoords(coordsString: string): Coords {
  const [latitude, longitude] = coordsString.split(',');
  return {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude)
  };
}

export function createOffer(stringData: string): Offer {
  const [
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
  ] = stringData.replace('\n', '').split('\t');

  const user = {
    name,
    email,
    avatar,
    password,
    type: UserType[userType as keyof typeof UserType]
  };

  return {
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
    author: user
  };
}
