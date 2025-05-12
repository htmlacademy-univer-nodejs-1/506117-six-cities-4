import { Container } from 'inversify';
import { RestConfig } from '../shared/libs/config/rest.config.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { PinoLogger } from '../shared/libs/logger/pino.logger.js';
import { Component } from '../shared/types/component.enum.js';
import { RestApplication } from './rest-application.js';
import { DatabaseClient } from '../shared/database-client/database-client.interface.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Config } from '../shared/libs/config/index.js';
import { MongoDatabaseClient } from '../shared/database-client/mongo.database-client.js';
import { AppExceptionFilter, ExceptionFilter } from '../shared/libs/rest/index.js';

export function createRestApplicationContainer(appContainer: Container) {
  appContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  appContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  appContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  appContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  appContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
}
