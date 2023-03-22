import request, { SuperTest, Test } from 'supertest';

import { initializeServer } from '../src/server';

describe('App (e2e)', () => {
  let httpRequest: SuperTest<Test>;

  beforeAll(async () => {
    const { httpServer } = await initializeServer();
    httpRequest = request(httpServer);
  });

  it('should return all users with id', async () => {
    const data = {
      query: `
        query getUsers {
          users {
            id
          }
        }
      `,
    };

    const res = await httpRequest.post('/graphql').send(data);

    expect(res.status).toBe(200);
    expect(res.body.data.users).toContainEqual({
      id: expect.any(Number),
    });
  });

  it('should return all todos with title', async () => {
    const data = {
      query: `
        query getTodos {
          todos {
            title
          }
        }
      `,
    };

    const res = await httpRequest.post('/graphql').send(data);

    expect(res.status).toBe(200);
    expect(res.body.data.todos).toContainEqual({
      title: expect.any(String),
    });
  });

  it('should return one user with email', async () => {
    const data = {
      query: `
        query getUser {
          user(id: ${1}) {
            email
          }
        }
      `,
    };

    const res = await httpRequest.post('/graphql').send(data);

    expect(res.status).toBe(200);
    expect(res.body.data.user).toEqual({
      email: expect.any(String),
    });
  });

  it('should return one todo with done', async () => {
    const data = {
      query: `
        query getTodo {
          todo(id: ${1}) {
            done
          }
        }
      `,
    };

    const res = await httpRequest.post('/graphql').send(data);

    expect(res.status).toBe(200);
    expect(res.body.data.todo).toEqual({
      done: expect.any(Boolean),
    });
  });
});
