export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  CliApplication: Symbol.for('CliApplication'),
  ImportCommand: Symbol.for('ImportCommand'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),
  CommentService: Symbol.for('CommentService'),
  CommentModel: Symbol.for('CommentModel')
} as const;
