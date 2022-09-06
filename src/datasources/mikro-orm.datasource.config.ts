import {Options} from '@mikro-orm/core';
import type {PostgreSqlDriver} from '@mikro-orm/postgresql';

export const config = {
  type: 'postgresql',
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  dbName: process.env.PG_DATABASE,
} as Options<PostgreSqlDriver>;
