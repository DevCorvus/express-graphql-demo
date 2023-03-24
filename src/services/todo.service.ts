import { CreateTodoInput, UpdateTodoInput } from '../generated/graphql';
import { TodoModel, TodoInterface } from '../models/Todo';

export class TodoService {
  static findAll(): Promise<TodoInterface[]> {
    return TodoModel.find({});
  }

  static findOne(todoId: string): Promise<TodoInterface | null> {
    return TodoModel.findById(todoId);
  }

  static create(userId: string, data: CreateTodoInput): Promise<TodoInterface> {
    return TodoModel.create({ user: userId, ...data, done: false });
  }

  static update(
    userId: string,
    todoId: string,
    data: UpdateTodoInput
  ): Promise<TodoInterface | null> {
    return TodoModel.findOneAndUpdate({ user: userId, _id: todoId }, data);
  }

  static delete(userId: string, todoId: string): Promise<TodoInterface | null> {
    return TodoModel.findOneAndDelete({ user: userId, _id: todoId });
  }
}
