import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export const MongoDBProvider = MongooseModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_DB_URL'),
        connectionFactory: (connection) => {
            connection.on('connected', () => {
                Logger.log(
                    `${process.env.NODE_ENV} Database connected`,
                    'info',
                );
            });
            connection._events.connected();
            return connection;
        },
    }),
    inject: [ConfigService],
});
