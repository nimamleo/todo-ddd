import { ConfigFactory, registerAs } from '@nestjs/config';

export interface IMongoDbConfig {
    connectionString: string;
}

export const MONGODB_CONFIG_TOKEN = 'mongodb-config-token';

export const mongoConfig = registerAs<
    IMongoDbConfig,
    ConfigFactory<IMongoDbConfig>
>(MONGODB_CONFIG_TOKEN, () => {
    if (!process.env.MONGO_DB_URL_ONLINE) {
        throw new Error('MONGO_CONFIG_CONNECTION_STRING not provided.');
    }

    return {
        connectionString: process.env.MONGO_CONFIG_CONNECTION_STRING,
    };
});
