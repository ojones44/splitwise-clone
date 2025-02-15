// Mongoose import
import mongoose, { Schema, Model } from "mongoose";

// Data types import
import { requiredNameString } from "./dataTypes";
import { UserType } from "./userModel";
import { GroupType } from "./groupModel";

// Types
export interface ExpenseType {
  // _id: string;
  name: string;
  balance: number;
  paidBy: UserType[];
  debtors: UserType[];
  groupId: GroupType;
}

// Create new schema
const expenseSchema = new Schema<ExpenseType>(
  {
    name: requiredNameString({ max: 50 }),
    balance: { type: Number, required: true, min: 0 },
    paidBy: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    debtors: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  },
  {
    timestamps: true,
  }
);

// Create mongoose model
export const Expense = mongoose.model<ExpenseType>("Expense", expenseSchema);
