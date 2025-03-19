import { createWriteStream, WriteStream } from 'node:fs';
import { resolve as resolvePath } from 'node:path';

const CHUNK_SIZE = 16384;

export class TSVFileWriter {
  private writeStream: WriteStream;

  constructor(
    public readonly filePath: string
  ) {
    this.writeStream = createWriteStream(resolvePath(this.filePath), {
      autoClose: true,
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8'
    });
  }

  public async write(row: string): Promise<unknown> {
    const written = this.writeStream.write(`${row}\n`);

    if (!written) {
      return new Promise((resolve) => this.writeStream.once('drain', () => resolve(true)));
    }

    return Promise.resolve();
  }
}
