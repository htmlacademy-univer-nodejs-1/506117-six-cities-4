import { capitalize, getRandomItem, getRandomItems, getRandomValue } from '../../helpers/index.js';
import { FacilitiesType, MockServerData, OfferType, UserType } from '../../types/index.js';
import { OfferGenerator } from './offer-generator.interface.js';

const MIN_RATE = 0.0;
const MAX_RATE = 5.0;

const ROOMS_MIN = 2;
const ROOMS_MAX = 4;

const PERSON_MIN = 1;
const PERSON_MAX = 4;

const RENT_MIN = 5.00;
const RENT_MAX = 50.00;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockServerData: MockServerData
  ) { }

  public generate(): string {
    const title = getRandomItem(this.mockServerData.titles);
    const description = getRandomItem(this.mockServerData.descriptions);
    const date = getRandomItem(this.mockServerData.dates);
    const city = getRandomItem(this.mockServerData.cities);
    const preview = getRandomItem(this.mockServerData.previews);
    const photos = getRandomItem(this.mockServerData.photos);
    const isPremium = getRandomItem([true, false]);
    const isFavourite = getRandomItem([true, false]);
    const rate = getRandomValue(MIN_RATE, MAX_RATE, 1);
    const offerTypes = Object.keys(OfferType);
    const offerType = OfferType[offerTypes[getRandomValue(0, offerTypes.length - 1)] as keyof typeof OfferType];
    const roomsNum = getRandomValue(ROOMS_MIN, ROOMS_MAX);
    const personNum = getRandomValue(PERSON_MIN, PERSON_MAX);
    const rent = getRandomValue(RENT_MIN, RENT_MAX, 2);
    const facilitiesTypes = Object.keys(FacilitiesType);
    const facilities = getRandomItems(facilitiesTypes).map((type) => FacilitiesType[type as keyof typeof FacilitiesType]);
    const commentsNum = getRandomValue(0, 100);
    const coords = getRandomItem(this.mockServerData.coords);
    const name = getRandomItem(this.mockServerData.names);
    const email = getRandomItem(this.mockServerData.emails);
    const avatar = getRandomItem(this.mockServerData.avatars);
    const password = getRandomItem(this.mockServerData.passwords);
    const userTypes = Object.keys(UserType);
    const userType = UserType[userTypes[getRandomValue(0, userTypes.length - 1)] as keyof typeof UserType];

    return [
      title,
      description,
      date,
      city,
      preview,
      photos,
      isPremium,
      isFavourite,
      rate,
      capitalize(offerType),
      roomsNum,
      personNum,
      rent,
      facilities.map(
        (facility) => facility.split(' ').map((facilityPart) => capitalize(facilityPart)).join('')
      ).join(','),
      commentsNum,
      coords,
      name,
      email,
      avatar,
      password,
      capitalize(userType)
    ].join('\t');
  }
}
