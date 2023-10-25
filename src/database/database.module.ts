import { Module } from '@nestjs/common';
import { MongoDBProvider } from './mongo.provider';
@Module({
    imports: [MongoDBProvider],
})
export class DatabaseModule {}
