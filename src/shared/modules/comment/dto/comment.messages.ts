export const CommentValidationMessage = {
  text: {
    minLength: 'Minimum title length must be 5',
    maxLength: 'Maximum title length must be 1024',
  },
  rate: {
    invalidFormat: 'rating must be number',
    minValue: 'Minimum rating value must be 1',
    maxValue: 'Maximum rating value must be 5',
  },
  offerId: {
    invalidId: 'offerId field must be a valid id',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
