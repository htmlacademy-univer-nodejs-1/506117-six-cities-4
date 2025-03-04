import { createReadStream } from 'node:fs';
import EventEmitter from 'node:events';
import { resolve } from 'node:path';
import { FileReader } from './file-reader.interface.js';

const CHUNK_SIZE = 16384;

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(
    public readonly filePath: string
  ) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(resolve(this.filePath), {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8'
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let rowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        rowCount++;

        this.emit('line', completeRow);
      }
    }

    this.emit('end', rowCount);
  }
}
