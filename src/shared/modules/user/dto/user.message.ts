export const UserValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 1',
    maxLength: 'Maximum name length must be 15',
  },
  password: {
    minLength: 'Minimum password length must be 6',
    maxLength: 'Maximum password length must be 12',
  },
  email: {
    invalidFormat: 'email must be a valid address',
  },
  type: {
    invalidFormat: 'Type should be Standard or Professional'
  },
} as const;
