// Mongoose import
import mongoose, { Schema, Model, Document } from "mongoose";

// Data types import
import {
  requiredNameString,
  requiredEmailString,
  requiredPasswordString,
} from "./dataTypes";
import { GroupType } from "./groupModel";

export interface UserDocument extends Document {
  name: string;
  email: string;
  groups: GroupType[];
}

// Types
export interface UserType {
  // _id: string;
  name: string;
  email: string;
  password: string;
  groups: GroupType[];
}

// Create new schema
const userSchema = new Schema<UserType>(
  {
    name: requiredNameString(),
    email: requiredEmailString,
    password: requiredPasswordString,
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  },
  {
    timestamps: true,
    toObject: {
      transform(_doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// Create mongoose model
export const User = mongoose.model<UserType>("User", userSchema);
