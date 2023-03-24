import { GraphQLError } from 'graphql';

export class GraphQLUnauthenticatedException extends GraphQLError {
  constructor() {
    super('You are not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: {
          status: 401,
        },
      },
    });
  }
}
