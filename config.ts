import * as process from 'process';

import { config } from 'dotenv';

config({ path: '.env' });

export const CONFIG_DB_HOST = process.env.DB_HOST;
export const CONFIG_DB_PORT = Number.parseInt(process.env.DB_PORT);
export const CONFIG_DB_USERNAME = process.env.DB_USERNAME;
export const CONFIG_DB_PASSWORD = process.env.DB_PASSWORD;
export const CONFIG_DB_NAME = process.env.DB_NAME;
export const TINY_SECRET = process.env.TINY_SECRET;
export const DOMAIN_NAME = process.env.DOMAIN_NAME;
