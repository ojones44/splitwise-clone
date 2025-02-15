"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = exports.NotFoundError = exports.BadRequestError = exports.CustomError = void 0;
const data_1 = require("data");
// Custom Error API
class CustomError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.CustomError = CustomError;
// Bad request error
class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = data_1.HTTP_STATUS.BAD;
    }
}
exports.BadRequestError = BadRequestError;
// Not found error
class NotFoundError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = data_1.HTTP_STATUS.NOT_FOUND;
    }
}
exports.NotFoundError = NotFoundError;
// Unauthenticated error
class UnauthenticatedError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = data_1.HTTP_STATUS.UNAUTHORIZED;
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
