// Mongoose import
import mongoose, { Schema, Model } from "mongoose";

// Data types import
import { requiredNameString } from "./dataTypes";
import { UserType } from "./userModel";
import { ExpenseType } from "./expenseModel";

// Types
export interface GroupType {
  // _id: string;
  name: string;
  expenses: ExpenseType[];
  status: string;
  users: UserType[];
}

// Create new schema
const groupSchema = new Schema<GroupType>(
  {
    name: requiredNameString({ max: 50 }),
    expenses: [{ type: Schema.Types.ObjectId, ref: "Expense", required: true }],
    status: requiredNameString({ max: 50 }),
    users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  {
    timestamps: true,
  }
);

// Create mongoose model
export const Group = mongoose.model<GroupType>("Group", groupSchema);
