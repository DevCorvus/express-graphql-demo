import { Document, Schema, model as createModel } from 'mongoose';
import { UserInterface } from './User';

export interface TodoInterface extends Document {
  title: string;
  done: boolean;
  user: string | UserInterface;
  createdAt: string;
  updatedAt: string;
}

const todoSchema = new Schema(
  {
    title: String,
    done: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const TodoModel = createModel<TodoInterface>('Todo', todoSchema);
