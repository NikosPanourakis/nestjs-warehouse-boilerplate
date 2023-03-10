import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASS || 'pass',
  database: process.env.DB_NAME || 'WH_TEST',
  synchronize: false,
  logging: false,
  entities: ['src/infra/db/**/*.entity.ts'],
  migrations: ['src/infra/db/migrations/*.ts'],
  migrationsRun: false
});
