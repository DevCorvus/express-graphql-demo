import { Connection } from 'mongoose';
import request, { SuperTest, Test } from 'supertest';

import { initializeServer } from '../src/core/server';
import { UserInterface } from '../src/models/User';
import { UserService } from '../src/services/user.service';
import { mockUser, mockUserUpdate } from './mock-data/users';
import { resetMongoDocuments } from './utils/resetMongoDocuments';

describe('App (e2e)', () => {
  let dbConn: Connection;
  let httpRequest: SuperTest<Test>;

  beforeAll(async () => {
    const { httpServer, mongoConn } = await initializeServer();
    dbConn = mongoConn;
    httpRequest = request(httpServer);
  });

  afterEach(async () => {
    await resetMongoDocuments(dbConn.db);
  });

  afterAll(async () => {
    await dbConn.close();
  });

  it('should return all users with id (empty)', async () => {
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
    expect(Array.isArray(res.body.data.users)).toBeTruthy();
    expect(res.body.data.users).toHaveLength(0);
  });

  it('should create a user', async () => {
    const data = {
      query: `
        mutation CreateUser($data: CreateUserInput!) {
          createUser(data: $data) {
            id
            email
          }
        }
      `,
      variables: {
        data: mockUser,
      },
    };

    const res = await httpRequest.post('/graphql').send(data);
    expect(res.status).toBe(200);
    expect(res.body.data.createUser).toEqual({
      id: expect.any(String),
      email: mockUser.email,
    });

    const userExists = await UserService.existsByEmail(mockUser.email);
    expect(userExists).toBeTruthy();
  });

  describe('after user created', () => {
    let user: UserInterface;

    beforeEach(async () => {
      user = await UserService.create(mockUser);
    });

    it('should return all users with id and todos', async () => {
      const data = {
        query: `
          query getUsers {
            users {
              id
              todos {
                title
              }
            }
          }
        `,
      };

      const res = await httpRequest.post('/graphql').send(data);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data.users)).toBeTruthy();
      expect(res.body.data.users).toHaveLength(1);
      expect(res.body.data.users).toContainEqual({
        id: user.id,
        todos: [],
      });
    });

    it('should return one user with email', async () => {
      const data = {
        query: `
          query getUser {
            user(id: "${user.id}") {
              email
            }
          }
        `,
      };

      const res = await httpRequest.post('/graphql').send(data);

      expect(res.status).toBe(200);
      expect(res.body.data.user).toEqual({
        email: user.email,
      });
    });

    it('should update a user', async () => {
      const data = {
        query: `
          mutation UpdateUser($id: ID!, $data: UpdateUserInput!) {
            updateUser(id: $id, data: $data) {
              email
            }
          }
        `,
        variables: {
          id: user.id,
          data: mockUserUpdate,
        },
      };

      const res = await httpRequest.post('/graphql').send(data);
      expect(res.status).toBe(200);
      expect(res.body.data.updateUser).toEqual({
        email: mockUser.email,
      });

      const foundUser = (await UserService.findOne(user.id)) as UserInterface;
      expect(foundUser.email).toBe(mockUserUpdate.email);
    });

    it('should delete a user', async () => {
      const data = {
        query: `
          mutation DeleteUser($id: ID!) {
            deleteUser(id: $id) {
              email
            }
          }
        `,
        variables: {
          id: user.id,
        },
      };

      const res = await httpRequest.post('/graphql').send(data);
      expect(res.status).toBe(200);
      expect(res.body.data.deleteUser).toEqual({
        email: user.email,
      });

      const userExists = await UserService.existsById(user.id);
      expect(userExists).toBeFalsy();
    });
  });
});
