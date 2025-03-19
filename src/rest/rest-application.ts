import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { Config } from 'convict';
import { RestSchema } from '../shared/libs/config/rest.schema.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) { }

  public init(): void {
    this.logger.info('Application initialized');
    this.logger.info(`Env data: ${this.config.get('DB_ADDR')}`);
  }
}
