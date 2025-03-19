import { resolve } from 'node:path';
import { Logger } from './logger.interface.js';
import { Logger as PinoInstance, pino, transport } from 'pino';
import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';
import { injectable } from 'inversify';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        }
      ],
    });

    this.logger = pino({}, multiTransport);
  }

  info(msg: string, ...args: unknown[]): void {
    this.logger.info(msg, ...args);
  }

  warn(msg: string, ...args: unknown[]): void {
    this.logger.warn(msg, ...args);
  }

  error(error: Error, msg?: string, ...args: unknown[]): void {
    this.logger.warn(error, msg, ...args);
  }

  debug(msg: string, ...args: unknown[]): void {
    this.logger.debug(msg, ...args);
  }
}
