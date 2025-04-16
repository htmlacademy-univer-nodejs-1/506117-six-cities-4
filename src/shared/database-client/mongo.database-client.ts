import { inject } from 'inversify';
import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../types/component.enum.js';
import { Logger } from '../libs/logger/logger.interface.js';
import * as Mongoose from 'mongoose';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

export class MongoDatabaseClient implements DatabaseClient {
  private mongooseInstance: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(connectionString: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('Database is already connected.');
    }

    this.logger.info('Connecting to MongoDB');
    for (let attempt = 0; attempt < RETRY_COUNT; attempt++) {
      try {
        this.mongooseInstance = await Mongoose.connect(connectionString);
        this.isConnected = true;
        this.logger.info('Connected to MongoDB');
        return;
      } catch (error) {
        this.logger.error(error as Error, `Connection failed, attempt №${attempt + 1}`);
        await setTimeout(() => {}, RETRY_TIMEOUT);
      }
    }

    throw Error(`Connection failed after ${RETRY_COUNT} attempts`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('There is no connection to database');
    }

    await this.mongooseInstance.disconnect();
    this.isConnected = false;
    this.logger.info('Disconnected to database.');
  }

}
