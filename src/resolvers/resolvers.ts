import { GraphQLUnauthenticatedException } from '../exceptions/GraphQLUnauthenticatedException';
import { Resolvers, Todo, User } from '../generated/graphql';
import { TodoInterface } from '../models/Todo';
import { UserInterface } from '../models/User';
import { TodoService } from '../services/todo.service';
import { UserService } from '../services/user.service';

export const resolvers: Resolvers = {
  Query: {
    async users() {
      const data = await UserService.findAll();
      return data as User[];
    },
    async user(_parent, args) {
      const data = await UserService.findOne(args.id);
      return data as User;
    },
    async todos() {
      const data = await TodoService.findAll();
      return data as Todo[];
    },
    async todo(_parent, args) {
      const data = await TodoService.findOne(args.id);
      return data as Todo;
    },
  },
  Mutation: {
    async createUser(_parent, { data }) {
      const newUser = await UserService.create(data);
      return newUser as User;
    },
    async updateUser(_parent, { id, data }) {
      const updatedUser = await UserService.update(id, data);
      return updatedUser as User;
    },
    async deleteUser(_parent, { id }) {
      const userDeleted = await UserService.delete(id);
      return userDeleted as User;
    },
    async createTodo(_parent, { data }, ctx) {
      if (ctx.userId) {
        const newTodo = await TodoService.create(ctx.userId, data);
        return newTodo as Todo;
      } else {
        throw new GraphQLUnauthenticatedException();
      }
    },
    async updateTodo(_parent, { id, data }, ctx) {
      if (ctx.userId) {
        const updatedTodo = await TodoService.update(ctx.userId, id, data);
        return updatedTodo as Todo;
      } else {
        throw new GraphQLUnauthenticatedException();
      }
    },
    async deleteTodo(_parent, { id }, ctx) {
      if (ctx.userId) {
        const todoDeleted = await TodoService.delete(ctx.userId, id);
        return todoDeleted as Todo;
      } else {
        throw new GraphQLUnauthenticatedException();
      }
    },
  },
  User: {
    todos: async (parent) => {
      const userId = (parent as UserInterface)._id;
      const data = await TodoService.findAllFromUser(userId);
      return data as Todo[];
    },
  },
  Todo: {
    user: async (parent) => {
      const userId = (parent as TodoInterface).user as string;
      const data = await UserService.findOne(userId);
      return data as User;
    },
  },
};
