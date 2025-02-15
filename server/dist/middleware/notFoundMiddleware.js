"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const data_1 = require("data");
const notFoundMiddleware = (_req, res) => {
    const statusCode = data_1.HTTP_STATUS.NOT_FOUND;
    res.status(statusCode);
    res.json({
        message: 'Route does not exist',
    });
};
exports.notFoundMiddleware = notFoundMiddleware;
