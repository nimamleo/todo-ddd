import {
    Document,
    FilterQuery,
    Model,
    UpdateQuery,
    UpdateWriteOpResult,
} from 'mongoose';
import { IEntityRepository } from 'src/common/interface/entityRepository.interface';

export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) {}

    async findOne(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>,
    ): Promise<T | null> {
        return this.entityModel
            .findOne(entityFilterQuery, {
                __v: 0,
                ...projection,
            })
            .exec();
    }

    async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
        return this.entityModel.find(entityFilterQuery);
    }

    async create(createEntityData: unknown): Promise<T | any> {
        const entity = new this.entityModel(createEntityData);
        return entity.save();
    }

    async updateOne(
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateQuery<unknown>,
    ): Promise<UpdateWriteOpResult | null> {
        return this.entityModel.updateOne(entityFilterQuery, updateEntityData, {
            new: true,
        });
    }

    async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const deleteResult =
            await this.entityModel.deleteOne(entityFilterQuery);
        return deleteResult.deletedCount >= 1;
    }
}
