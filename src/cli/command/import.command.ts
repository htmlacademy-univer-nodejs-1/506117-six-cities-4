import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/modules/user/index.js';
import { Command } from './command.interface.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { DatabaseClient } from '../../shared/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../../shared/database-client/mongo.database-client.js';
import { Offer } from '../../shared/types/index.js';

export class ImportCommand implements Command {
  private readonly logger: Logger;
  private readonly databaseClient: DatabaseClient;
  private readonly userService: UserService;
  private readonly offerService: OfferService;
  private salt: string;

  constructor() {
    this.onLineRead = this.onLineRead.bind(this);
    this.onCompleteReading = this.onCompleteReading.bind(this);

    this.logger = new ConsoleLogger();
    this.databaseClient = new MongoDatabaseClient(this.logger);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
  }

  public getName(): string {
    return '--import';
  }

  private onLineRead(line: string) {
    const offer = createOffer(line);
    this.logger.info(`posting offer ${offer.title}`);

    this.userService.create(
      {
        ...offer.author,
        password: 'passwd1',
      },
      this.salt
    );

    this.offerService.create(offer, this.salt);

    this.logger.info(`post offer ${offer.title} success`);
  }

  private onCompleteReading(count: number) {
    console.info(`${count} rows imported`);
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: 'passwd1'
    }, this.salt);

    await this.offerService.create({
      
    });
  }

  private async _initDB(connectionString: string) {
    console.log('Connecting to database');
    await this.databaseClient.connect(connectionString);
    console.log('Connection success');
  }

  public async execute(...params: string[]): Promise<void> {
    const [filePath, connectionString, salt] = params;
    this.salt = salt;

    await this._initDB(connectionString);
    const fileReader = new TSVFileReader(filePath.trim());

    fileReader.on('line', this.onLineRead);
    fileReader.on('end', this.onCompleteReading);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Error importing from file: ${filePath}`);
      console.error(getErrorMessage(error));
    }
  }
}
