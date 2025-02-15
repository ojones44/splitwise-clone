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
exports.protectRoute = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const data_1 = require("data");
// Helper Functions
const utils_1 = require("utils");
// Error handlers
const errors_1 = require("errors");
const models_1 = require("models");
const sendNoAuth = (response, msg) => {
    response.status(data_1.HTTP_STATUS.UNAUTHORIZED);
    throw new errors_1.UnauthenticatedError(msg);
};
exports.protectRoute = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        sendNoAuth(res, "Authentication failed");
    }
    if (authHeader && authHeader.startsWith("Bearer")) {
        try {
            const token = authHeader.split(" ")[1];
            const decoded = (0, utils_1.verifyToken)(token);
            const user = yield models_1.User.findById(decoded.id).select("-password");
            if (!user) {
                sendNoAuth(res, "Authentication failed");
                return;
            }
            req.user = user;
            next();
        }
        catch (err) {
            sendNoAuth(res, "Authentication failed");
        }
    }
    else {
        sendNoAuth(res, "Not authorized, please try again or login.");
    }
}));
