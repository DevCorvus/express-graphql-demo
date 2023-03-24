import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1:27017/express-graphql-demo';

export async function connectMongoDB() {
  const { connection } = await mongoose.connect(mongoURI);
  return connection;
}
