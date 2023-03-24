import { Application } from 'express';
import { Server } from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';

import { resolvers } from '../resolvers/resolvers';
import { apolloAuthMiddleware } from '../middlewares/auth.middleware';

export interface ApolloContext {
  userId: string | null;
}

export async function initializeApolloServer(
  httpServer: Server,
  app: Application
) {
  const typeDefs = await loadSchema('src/schemas/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  });

  const apolloServer = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, { context: apolloAuthMiddleware })
  );
}
