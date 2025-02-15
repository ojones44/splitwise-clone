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
exports.remove = exports.create = exports.getAll = void 0;
// Imports
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const data_1 = require("data");
const utils_1 = require("utils");
// Database
const models_1 = require("models");
// Error handlers
const errors_1 = require("errors");
// Managing groups
// @description   Get all groups
// @route         GET /api/group
// @access        Private
exports.getAll = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const groups = yield models_1.Group.find({ users: { $in: [user.id] } });
    res.status(data_1.HTTP_STATUS.OK).json({ groups });
}));
// @description   Create group
// @route         POST /api/group
// @access        Private
exports.create = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            throw new errors_1.BadRequestError("Name is not provided");
        }
        const user = req.user;
        const newGroup = yield models_1.Group.create({
            name,
            expenses: [],
            status: "£0.00",
            users: [user.id],
        });
        !user.groups.includes(newGroup.id) && user.groups.push(newGroup.id);
        yield user.save();
        res.status(data_1.HTTP_STATUS.OK).json({
            group: newGroup.toObject(),
            token: (0, utils_1.generateToken)(user.id),
        });
    }
    catch (error) {
        next(error);
    }
}));
// @description   Delete group
// @route         DELETE /api/group/:id
// @access        Private
exports.remove = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield models_1.Group.findByIdAndDelete(req.params.id);
        if (!group) {
            res.status(data_1.HTTP_STATUS.BAD);
            throw new errors_1.BadRequestError(`Group not found`);
        }
        res
            .status(data_1.HTTP_STATUS.OK)
            .json(`Group with id ${group.id} has been deleted`);
    }
    catch (error) {
        next(error);
    }
}));
