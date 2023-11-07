import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
    createdAt: Date,
    updatedAt: Date,
  }

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for name is 1'],
    maxLength: [15, 'Max length for name is 15']
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  avatar: {
    type: String,   
    minlength: [5, 'Min length for avatar path is 5'],
  },
  userType: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);