import { createConnection } from 'typeorm';
import ormConfig from '../../ormconfig.json';
const { DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

createConnection({
  ...ormConfig,
  database: DB_NAME as string,
  host: DB_HOST as string,
  port: DB_PORT as string,
  password: DB_PASSWORD as string,
  username: DB_USER as string,
} as any);
