import { CreateUserInput, UpdateUserInput } from '../generated/graphql';
import { UserInterface, UserModel } from '../models/User';

export class UserService {
  static findAll(): Promise<UserInterface[]> {
    return UserModel.find({}).populate('todos');
  }

  static findOne(userId: string): Promise<UserInterface | null> {
    return UserModel.findById(userId);
  }

  static create(data: CreateUserInput): Promise<UserInterface> {
    return UserModel.create(data);
  }

  static update(
    userId: string,
    data: UpdateUserInput
  ): Promise<UserInterface | null> {
    return UserModel.findByIdAndUpdate(userId, data);
  }

  static delete(userId: string): Promise<UserInterface | null> {
    return UserModel.findByIdAndDelete(userId);
  }

  static async existsById(userId: string): Promise<boolean> {
    const result = await UserModel.exists({ _id: userId });
    return Boolean(result);
  }

  static async existsByEmail(email: string): Promise<boolean> {
    const result = await UserModel.exists({ email });
    return Boolean(result);
  }
}
