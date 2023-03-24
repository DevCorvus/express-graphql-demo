import { Document, Schema, model as createModel } from 'mongoose';
import { TodoInterface } from './Todo';

export interface UserInterface extends Document {
  email: string;
  password: string;
  todos: null | string[] | TodoInterface[];
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Todo',
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = createModel<UserInterface>('User', userSchema);
