export const OfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  date: {
    invalidFormat: 'date must be a valid ISO date',
  },
  city: {
    invalidFormat: 'city must be valid string',
  },
  preview: {
    invalidFormat: 'preview must be valid string',
  },
  photos: {
    invalidFormat: 'Field photos must be an array',
  },
  rate: {
    invalidFormat: 'rating must be number',
    minValue: 'Minimum rating value must be 1',
    maxValue: 'Maximum rating value must be 5',
  },
  isPremium: {
    invalidFormat: 'isPremium must be boolean',
  },
  isFavourite: {
    invalidFormat: 'isFavourite must be boolean',
  },
  type: {
    invalid: 'type must be apartment, house, room or hotel',
  },
  roomsNum: {
    invalidFormat: 'Rooms number must be an integer',
    minValue: 'Minimum roomsNum value must be 1',
    maxValue: 'Maximum roomsNum value must be 8',
  },
  personNum: {
    invalidFormat: 'Persons number must be an integer',
    minValue: 'Minimum personNum value must be 1',
    maxValue: 'Maximum personNum value must be 10',
  },
  rent:{
    invalidFormat: 'Rent must be an integer',
    minValue: 'Minimum rent value must be 100',
    maxValue: 'Maximum rent value must be 100.000',
  },
  facilities: {
    invalidFormat: 'facilities must be array',
  },
  authorId: {
    invalidId: 'authorId field must be a valid id',
  },
  coords: {
    invalidFormat: 'coords must be object',
  }
} as const;
