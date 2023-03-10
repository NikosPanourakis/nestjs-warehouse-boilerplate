import { DataSource } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: true,
  migrations: ['src/infra/db/migrations/*.ts']
});
