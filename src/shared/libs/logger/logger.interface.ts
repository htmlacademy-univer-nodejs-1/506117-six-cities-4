export interface Logger {
  info(msg: string, ...args: unknown[]): void;
  warn(msg: string, ...args: unknown[]): void;
  error(error: Error, msg?: string, ...args: unknown[]): void;
  debug(msg: string, ...args: unknown[]): void;
}
