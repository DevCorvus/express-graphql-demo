import { Request } from 'express';
import { ApolloContext } from '../core/apollo';
import { UserService } from '../services/user.service';

interface ApolloAuthMiddlewareInterface {
  req: Request;
}

// This doesn't really handle authentication, it's just a "fake" demo
export async function apolloAuthMiddleware({
  req,
}: ApolloAuthMiddlewareInterface): Promise<ApolloContext> {
  const userId = (req.headers.authorization as string) || null;

  if (userId) {
    const userExists = await UserService.existsById(userId);
    return { userId: userExists ? userId : null };
  } else {
    return { userId: null };
  }
}
