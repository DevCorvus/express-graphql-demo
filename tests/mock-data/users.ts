import { CreateUserInput, UpdateUserInput } from '../../src/generated/graphql';

export const mockUser: CreateUserInput = {
  email: 'fulanito@email.com',
  password: '123456',
};

export const mockUserUpdate: UpdateUserInput = {
  email: 'fulanita@email.com',
};
