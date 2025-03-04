import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { resolve } from 'node:path';
import chalk from 'chalk';

type JSONWithVersion = {
  version: string
}

function checkJSONWithVersion(jsonData: unknown): jsonData is JSONWithVersion {
  return (
    typeof jsonData === 'object' &&
    jsonData !== null &&
    !Array.isArray(jsonData) &&
    Object.hasOwn(jsonData, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    public readonly versionFilePath: string = './package.json'
  ) {}

  public getName(): string {
    return '--version';
  }

  private readVersion(): string {
    const stringData = readFileSync(resolve(this.versionFilePath), 'utf8');
    const data: unknown = JSON.parse(stringData);

    if (!checkJSONWithVersion(data)) {
      throw new Error('There is no .json file with property "version"');
    }

    return data['version'];
  }

  public execute(): void {
    try {
      const version = this.readVersion();
      console.log(chalk.bgGreen(version));
    } catch (error: unknown) {
      console.error(`Error occured by reading: ${this.versionFilePath}`);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
