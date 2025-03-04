import got from 'got';
import { MockServerData } from '../../shared/types/index.js';
import { Command } from './command.interface.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class GenerateCommand implements Command {
  private mockData: MockServerData;

  getName(): string {
    return '--generate';
  }

  private async loadData(url: string): Promise<void> {
    try {
      this.mockData = await got.get(url).json();
    } catch (error) {
      throw new Error(`Error loading data from ${url}`);
    }
  }

  private async write(filePath: string, offerCount: number): Promise<void> {
    const tsvOfferGenerator = new TSVOfferGenerator(this.mockData);
    const tsvFileWriter = new TSVFileWriter(filePath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filePath, url] = params;
    const offerNum = parseInt(count, 10);

    try {
      await this.loadData(url);
      await this.write(filePath, offerNum);
      console.info(`File ${filePath} was created!`);
    } catch (error) {
      console.error('Error in generating file');
      console.error(getErrorMessage(error));
    }
  }

}
