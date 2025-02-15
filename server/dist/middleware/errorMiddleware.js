"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMessages_1 = require("./errorMessages");
const errorMiddleware = (err, _req, res, _next) => {
    (0, errorMessages_1.setDefaultError)(err);
    if (err.name === 'ValidationError') {
        (0, errorMessages_1.setValidationError)(err);
    }
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        (0, errorMessages_1.setDuplicateError)(err);
    }
    res.status(errorMessages_1.errorMessage.statusCode);
    res.json({ message: errorMessages_1.errorMessage.message });
    // full_msg: err,
};
exports.errorMiddleware = errorMiddleware;
