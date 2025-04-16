import { Container } from 'inversify';
import { DatabaseClient } from '../shared/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../shared/database-client/mongo.database-client.js';
import { PinoLogger } from '../shared/libs/logger/pino.logger.js';
import { Component } from '../shared/types/component.enum.js';
import { CLIApp } from './cli-app.js';
import { Logger } from '../shared/libs/logger/index.js';
import { ImportCommand } from './command/import.command.js';
import { RestConfig } from '../shared/libs/config/rest.config.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { Config } from '../shared/libs/config/index.js';

export function createCliAppContainer(appContainer: Container) {
  appContainer.bind<CLIApp>(Component.CliApplication).to(CLIApp).inSingletonScope();
  appContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  appContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  appContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  appContainer.bind<ImportCommand>(Component.ImportCommand).to(ImportCommand).inSingletonScope();
}
