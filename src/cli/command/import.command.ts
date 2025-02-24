import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  getName(): string {
    return '--import';
  }

  execute(...params: string[]): void {
    const [filePath] = params;
    const fileReader = new TSVFileReader(filePath.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(`Error importing from file: ${filePath}`);
      console.error(error.message);
    }
  }
}
