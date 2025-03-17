import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onLineRead(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteReading(count: number) {
    console.info(`${count} rows imported`);
  }

  public async execute(...params: string[]): Promise<void> {
    const [filePath] = params;
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
