import { User, Todo, Resolvers } from '../generated/graphql';

const todos: Todo[] = [
  {
    id: 1,
    title: 'Turn on the server',
    done: true,
  },
  {
    id: 2,
    title: 'Visit Ohio',
    done: false,
  },
];

const users: User[] = [
  { id: 1, email: 'fulano@email.com', password: '123456', todos },
  { id: 2, email: 'fulana@email.com', password: '123456', todos },
];

export const resolvers: Resolvers = {
  Query: {
    users() {
      return users;
    },
    user(_ctx, args) {
      return users.find((user) => user.id === args.id) || null;
    },
    todos() {
      return todos;
    },
    todo(_ctx, args) {
      return todos.find((todo) => todo.id === args.id) || null;
    },
  },
};
