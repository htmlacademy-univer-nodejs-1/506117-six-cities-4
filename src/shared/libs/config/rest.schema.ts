import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number,
  DB_ADDR: string,
  SALT: string
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 3000
  },
  DB_ADDR: {
    doc: 'IP address for database server',
    format: 'ipaddress',
    env: 'DB_ADDR',
    default: '127.0.0.1'
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  }
});
