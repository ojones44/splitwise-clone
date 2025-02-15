// Imports
import asyncHandler from "express-async-handler";
import { HTTP_STATUS } from "data";
import _ from "lodash";
import { generateToken } from "utils";

// Database
import { Expense, Group, User } from "models";

// Error handlers
import { BadRequestError, UnauthenticatedError } from "errors";
import exp from "constants";

// Managing expenses

// @description   Create expense
// @route         POST /api/expense
// @access        Private
export const create = asyncHandler(async (req, res, next) => {
  try {
    const { name, balance, paidBy, debtors = [], groupId } = req.body;

    if (
      !name ||
      !balance ||
      !groupId ||
      !Array.isArray(paidBy) ||
      paidBy.length === 0
    ) {
      throw new BadRequestError("Please provide data in all fields");
    }

    const user = req.user!;

    const group = await Group.findById(groupId);

    if (!group) {
      res.status(HTTP_STATUS.BAD);
      throw new BadRequestError("Group not found");
    }

    const newExpense = await Expense.create({
      name,
      balance,
      paidBy,
      debtors,
      groupId,
    });

    !group.expenses.includes(newExpense.id) &&
      group.expenses.push(newExpense.id);

    await group.save();

    res.status(HTTP_STATUS.OK).json({
      expense: newExpense.toObject(),
      token: generateToken(user.id),
    });
  } catch (error) {
    next(error);
  }
});

// @description   Delete expense
// @route         DELETE /api/expense/:id
// @access        Private
export const remove = asyncHandler(async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      res.status(HTTP_STATUS.BAD);
      throw new BadRequestError(`Expense not found`);
    }

    res
      .status(HTTP_STATUS.OK)
      .json(`Expense with id ${expense.id} has been deleted`);
  } catch (error) {
    next(error);
  }
});
