"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.create = void 0;
// Imports
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const data_1 = require("data");
const utils_1 = require("utils");
// Database
const models_1 = require("models");
// Error handlers
const errors_1 = require("errors");
// Managing expenses
// @description   Create expense
// @route         POST /api/expense
// @access        Private
exports.create = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, balance, paidBy, debtors = [], groupId } = req.body;
        if (!name ||
            !balance ||
            !groupId ||
            !Array.isArray(paidBy) ||
            paidBy.length === 0) {
            throw new errors_1.BadRequestError("Please provide data in all fields");
        }
        const user = req.user;
        const group = yield models_1.Group.findById(groupId);
        if (!group) {
            res.status(data_1.HTTP_STATUS.BAD);
            throw new errors_1.BadRequestError("Group not found");
        }
        const newExpense = yield models_1.Expense.create({
            name,
            balance,
            paidBy,
            debtors,
            groupId,
        });
        !group.expenses.includes(newExpense.id) &&
            group.expenses.push(newExpense.id);
        yield group.save();
        res.status(data_1.HTTP_STATUS.OK).json({
            expense: newExpense.toObject(),
            token: (0, utils_1.generateToken)(user.id),
        });
    }
    catch (error) {
        next(error);
    }
}));
// @description   Delete expense
// @route         DELETE /api/expense/:id
// @access        Private
exports.remove = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = yield models_1.Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            res.status(data_1.HTTP_STATUS.BAD);
            throw new errors_1.BadRequestError(`Expense not found`);
        }
        res
            .status(data_1.HTTP_STATUS.OK)
            .json(`Expense with id ${expense.id} has been deleted`);
    }
    catch (error) {
        next(error);
    }
}));
