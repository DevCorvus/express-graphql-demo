import { mongo } from 'mongoose';

export async function resetMongoDocuments(db: mongo.Db) {
  const collections = await db.listCollections().toArray();

  return Promise.all(
    collections.map((collection) => {
      return db.collection(collection.name).deleteMany({});
    })
  );
}
