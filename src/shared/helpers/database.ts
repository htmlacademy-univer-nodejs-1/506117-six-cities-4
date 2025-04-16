import * as crypto from 'node:crypto';

export function createSHA256(str: string, salt: string): string {
  const enc = crypto.createHmac('sha-256', salt);
  return enc.update(str).digest('hex');
}

export function getMongoConnectionString(
  username: string,
  password: string,
  host: string,
  port: string,
  dbName: string
) {
  return `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
}
