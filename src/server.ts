import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';

import { resolvers } from './resolvers/resolvers';

interface ApolloContext {}

export async function initializeServer() {
  const app = express();

  const httpServer = http.createServer(app);

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  const typeDefs = await loadSchema('src/schemas/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  });

  const apolloServer = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers: resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use('/graphql', expressMiddleware(apolloServer));

  app.set('port', 8000);

  return { httpServer, expressServer: app };
}
