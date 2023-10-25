import { Module } from '@nestjs/common';
import { MongoDBProvider } from './monodb/mongo.provider';
@Module({
    imports: [MongoDBProvider],
})
export class DatabaseModule {}
