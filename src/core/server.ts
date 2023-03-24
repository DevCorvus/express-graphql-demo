import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';

import { initializeApolloServer } from './apollo';
import { connectMongoDB } from './mongodb';

export async function initializeServer() {
  const mongoConn = await connectMongoDB();

  const app = express();

  const httpServer = http.createServer(app);

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  await initializeApolloServer(httpServer, app);

  app.set('port', 8000);

  return { httpServer, expressServer: app, mongoConn };
}
