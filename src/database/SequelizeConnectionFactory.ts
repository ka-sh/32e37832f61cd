import { Sequelize, Dialect } from 'sequelize';
import dbConfig from '../config/dbConfig';


export class SequelizeConnectionFactory {
    private static connection: Sequelize;

    private constructor() {
    }

    public static getConnection(): Sequelize {
        if (!SequelizeConnectionFactory.connection) {
            SequelizeConnectionFactory.connection = new Sequelize(
                dbConfig.database,
                dbConfig.username,
                dbConfig.password, {
                    dialect: dbConfig.dialect as Dialect,
                    host: dbConfig.host,
                    port: parseInt(dbConfig.port),
                },
            );
        }
        return SequelizeConnectionFactory.connection;

    }
}