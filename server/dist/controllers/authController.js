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
exports.deleteUser = exports.updatePassword = exports.updateUser = exports.register = exports.login = exports.getUsers = void 0;
// Imports
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const data_1 = require("data");
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("utils");
// Database
const models_1 = require("models");
// Error handlers
const errors_1 = require("errors");
// Managing login and registration
// @description   Get users list
// @route         GET /api/auth
// @access        Private
exports.getUsers = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.find({}).select('-password');
    res.status(data_1.HTTP_STATUS.OK).json({ users });
}));
// @description   Login user
// @route         POST /api/auth/login
// @access        Public
exports.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new errors_1.BadRequestError('Please provide email and password.');
        }
        const user = yield models_1.User.findOne({ email }).select('+password');
        if (!user) {
            throw new errors_1.BadRequestError('Invalid login credentials.');
        }
        const passwordMatched = yield (0, utils_1.comparePassword)(password, user.password);
        if (user && passwordMatched) {
            res.status(data_1.HTTP_STATUS.OK).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: (0, utils_1.generateToken)(user.id),
            });
        }
        else {
            throw new errors_1.UnauthenticatedError('Invalid login credentials.');
        }
    }
    catch (error) {
        next(error);
    }
}));
// @description   Register user
// @route         POST /api/auth/register
// @access        Public
exports.register = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new errors_1.BadRequestError('Please provide data in all fields');
        }
        if (password && password.length < 8) {
            throw new errors_1.BadRequestError('Invalid password, must be at least 8 characters');
        }
        const userAlreadyRegistered = yield models_1.User.findOne({
            email: lodash_1.default.toLower(email),
        });
        if (userAlreadyRegistered) {
            throw new errors_1.BadRequestError('Already registered. Please login.');
        }
        const newUser = yield models_1.User.create({
            name: lodash_1.default.startCase(lodash_1.default.toLower(name)),
            email: lodash_1.default.toLower(email),
            password: password && (yield (0, utils_1.hashPassword)(password)),
        });
        res.status(data_1.HTTP_STATUS.OK).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: (0, utils_1.generateToken)(newUser.id),
        });
    }
    catch (error) {
        next(error);
    }
}));
// @description   Update user details
// @route         PUT /api/auth/:id
// @access        Private
exports.updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.body.name || !req.body.email) {
            res.status(data_1.HTTP_STATUS.BAD);
            throw new errors_1.BadRequestError('Please provide all values');
        }
        const { name, email } = req.body;
        const user = yield models_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select('-password');
        if (!user) {
            res.status(data_1.HTTP_STATUS.BAD);
            throw new errors_1.BadRequestError('User not found');
        }
        user.name = req.body.name ? name || req.body.name : user.name;
        user.email = req.body.email ? email || req.body.email : user.email;
        yield user.save();
        res.status(data_1.HTTP_STATUS.OK).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: (0, utils_1.generateToken)(user.id),
        });
    }
    catch (error) {
        next(error);
    }
}));
// @description   Update user password
// @route         PUT /api/auth/password/:id
// @access        Private
exports.updatePassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmPassword) {
            res.status(data_1.HTTP_STATUS.BAD);
            throw new errors_1.BadRequestError('Please provide all fields');
        }
        const user = yield models_1.User.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b.id).select('+password');
        if (!user) {
            res.status(data_1.HTTP_STATUS.BAD);
            throw new errors_1.BadRequestError('User not found');
        }
        const oldPasswordMatched = yield (0, utils_1.comparePassword)(oldPassword, user.password);
        if (!oldPasswordMatched) {
            res.status(data_1.HTTP_STATUS.BAD);
            throw new errors_1.BadRequestError('Old password is incorrect');
        }
        const newPasswordValid = newPassword === confirmPassword;
        const isSameAsOldPassword = newPassword === oldPassword;
        if (!newPasswordValid) {
            res.status(data_1.HTTP_STATUS.BAD);
            throw new errors_1.BadRequestError('New password fields do not match');
        }
        if (isSameAsOldPassword) {
            res.status(data_1.HTTP_STATUS.BAD);
            throw new errors_1.BadRequestError('New password cannot be the same as old password');
        }
        if (oldPasswordMatched && newPasswordValid) {
            user.password = yield (0, utils_1.hashPassword)(newPassword);
            yield user.save();
            res.status(data_1.HTTP_STATUS.OK).json('Password successfully changed');
        }
    }
    catch (error) {
        next(error);
    }
}));
// @description   Delete user
// @route         DELETE /api/auth/:id
// @access        Private
exports.deleteUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const user = yield models_1.User.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c.id).select('-password');
        if (!user) {
            res.status(data_1.HTTP_STATUS.BAD);
            throw new errors_1.BadRequestError('User not found');
        }
        yield models_1.User.findByIdAndDelete(user.id);
        res.status(data_1.HTTP_STATUS.OK).json(`User with id ${user.id} has been deleted`);
    }
    catch (error) {
        next(error);
    }
}));
