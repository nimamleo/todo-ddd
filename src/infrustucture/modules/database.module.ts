import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; 

@Module({
    imports: [
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('MONGO_DB_URL'),
                connectionFactory: (connection) => {
                    connection.on('connected', () => {
                        console.log('DATABASE is connected');
                    });
                    connection._events.connected();
                    return connection;
                },
            }),
        }),
    ],
})
export class DatabaseModule {}
