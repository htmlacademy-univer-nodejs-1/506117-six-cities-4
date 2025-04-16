import { inject, injectable } from 'inversify';
import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { OfferService } from '../../shared/modules/offer/index.js';
import { UserService } from '../../shared/modules/user/index.js';
import { Command } from './command.interface.js';
import { Component } from '../../shared/types/component.enum.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { DatabaseClient } from '../../shared/database-client/database-client.interface.js';
import { Config } from 'convict';
import { RestSchema } from '../../shared/libs/config/rest.schema.js';

@injectable()
export class ImportCommand implements Command {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) { }

  public getName(): string {
    return '--import';
  }

  private onLineRead(line: string) {
    const offer = createOffer(line);
    this.logger.info(`posting offer ${offer.title}`);

    const salt = this.config.get('SALT');
    this.userService.create(
      {
        ...offer.author,
        password: 'passwd1'
      },
      salt
    );

    this.offerService.create(offer, salt);

    this.logger.info(`post offer ${offer.title} success`);
  }

  private onCompleteReading(count: number) {
    console.info(`${count} rows imported`);
  }

  private async _initDB(connectionString: string) {
    console.log('Connecting to database');
    await this.databaseClient.connect(connectionString);
    console.log('Connection success');
  }

  public async execute(...params: string[]): Promise<void> {
    const [filePath, connectionString] = params;

    await this._initDB(connectionString);
    const fileReader = new TSVFileReader(filePath.trim());

    fileReader.on('line', this.onLineRead.bind(this));
    fileReader.on('end', this.onCompleteReading.bind(this));

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Error importing from file: ${filePath}`);
      console.error(getErrorMessage(error));
    }
  }
}
