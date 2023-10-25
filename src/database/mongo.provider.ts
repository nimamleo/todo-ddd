// // core/database/mongodb/mongo-database.provider.ts
// import * as mongoose from 'mongoose';

// export const databaseProviders = [
//     {
//         provide: 'DATABASE_CONNECTION',
//         useFactory: async (): Promise<typeof mongoose> =>
//             await mongoose.connect(
//                 'mongodb://localhost:27017/your-database-name',
//                 {
//                     useUnifiedTopology: true,
//                     useFindAndModify: false,
//                     useCreateIndex: true,
//                 },
//             ),
//     },
// ];
