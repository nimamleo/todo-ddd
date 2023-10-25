export interface IEntityRepository<T> {
    findOne: (id: string) => Promise<void>;
    find: (query: T) => Promise<T>;
    create: (body: T) => Promise<T>;
    deleteOne: (id: string) => Promise<T>;
    updateOne: (id: string, body: T) => Promise<T>;
}
