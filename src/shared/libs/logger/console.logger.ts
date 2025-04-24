import { getErrorMessage } from '../../helpers/common.js';
import { Logger } from './logger.interface.js';

export class ConsoleLogger implements Logger {
  public info(msg: string, ...args: unknown[]): void {
    console.info(msg, ...args);
  }

  public warn(msg: string, ...args: unknown[]): void {
    console.warn(msg, ...args);
  }

  public error(error: Error, msg?: string, ...args: unknown[]): void {
    console.error(msg, ...args);
    console.error(`Error message: ${getErrorMessage(error)}`);
  }

  public debug(msg: string, ...args: unknown[]): void {
    console.debug(msg, ...args);
  }
}
