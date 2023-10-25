import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodolistModule } from './infrustucture/modules/todolist.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './infrustucture/modules/users.module';
import { AuthModule } from './infrustucture/modules/auth.module';
import { mongoConfig } from './database/monodb/mongo-db.config';
import { httpConfig } from './controller/http/http.config';
import { jwtConfig } from './infrustucture/Auth/jwt.config';

@Module({
    imports: [
        TodolistModule,
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [mongoConfig, httpConfig, jwtConfig],
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
        }),
        UsersModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
