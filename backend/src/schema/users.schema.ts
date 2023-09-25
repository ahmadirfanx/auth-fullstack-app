import { Document, Schema } from 'mongoose';
import { User } from 'src/interface/user.interface';

export const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});