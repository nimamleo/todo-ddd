import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TodolistModule } from './infrustucture/modules/todolist.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './infrustucture/modules/users.module';
import { AuthModule } from './infrustucture/modules/auth.module';

@Module({
    imports: [
        TodolistModule,
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGO_DB_URL: Joi.string(),
                JWT_SECRET: Joi.string(),
            }),
        }),
        UsersModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
