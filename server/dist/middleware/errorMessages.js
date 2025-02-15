"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDuplicateError = exports.setValidationError = exports.setDefaultError = exports.errorMessage = void 0;
const data_1 = require("data");
exports.errorMessage = {
    statusCode: data_1.HTTP_STATUS.BAD,
    message: 'Unexpected error. Please try again.',
};
const setDefaultError = (err) => {
    (exports.errorMessage.statusCode =
        err.statusCode || data_1.HTTP_STATUS.INTERNAL_SERVER_ERROR),
        (exports.errorMessage.message =
            `${err.message}` || 'Something went wrong, please try again later.');
};
exports.setDefaultError = setDefaultError;
const setValidationError = (err) => {
    exports.errorMessage.statusCode = data_1.HTTP_STATUS.BAD;
    if (err.errors)
        exports.errorMessage.message = `${Object.values(err.errors)
            .map((item) => item.message)
            .join(', ')}`;
};
exports.setValidationError = setValidationError;
const setDuplicateError = (err) => {
    exports.errorMessage.statusCode = data_1.HTTP_STATUS.BAD;
    exports.errorMessage.message = `${err.keyValue.email} already exists. Please login.`;
};
exports.setDuplicateError = setDuplicateError;
