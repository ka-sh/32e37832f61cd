import * as dotenv from 'dotenv';

export interface DatabaseConfig {
    host: string,
    port: string,
    dialect: string,
    username: string,
    password: string,
    database: string
}

dotenv.config(
    {
        path: `.env.${process.env.NODE_ENV || 'dev'}`,
    },
);

const dbConfig: DatabaseConfig = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST ?? '',
    port: process.env.DB_PORT ?? '',
    username: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? '',
};

export default dbConfig;