import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { Config } from 'convict';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { DatabaseClient } from '../shared/database-client/database-client.interface.js';
import { getMongoConnectionString } from '../shared/helpers/database.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient
  ) { }

  private _initDB() {
    const connectionString = getMongoConnectionString(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    this.databaseClient.connect(connectionString);
  }

  public async init() {
    this.logger.info('Application initialized');
    this.logger.info(`Env data: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this._initDB();
    this.logger.info('Database initialized');
  }
}
