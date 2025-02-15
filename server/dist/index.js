"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Package imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const colors_1 = __importDefault(require("colors"));
require("module-alias/register");
// Database
const index_1 = require("connect/index");
// Routes
const data_1 = require("data");
const routes_1 = require("routes");
// Middleware
const middleware_1 = require("middleware");
dotenv_1.default.config();
(0, index_1.connectDB)();
const app = (0, express_1.default)();
// Log response status codes in the console during development
if (process.env.NODE_ENV !== "production") {
    app.use((0, morgan_1.default)("dev"));
}
// Parse incoming requests as JSON
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
const port = Number(process.env.PORT) || 5000;
app.get("/api/test", (_req, res) => {
    res.json({ message: "Proxy enabled" });
});
// Any time these routes are hit, route file is called
app.use(data_1.endpoints.auth, routes_1.authRoutes);
app.use(data_1.endpoints.expense, routes_1.expenseRoutes);
app.use(data_1.endpoints.group, routes_1.groupRoutes);
// Looking for route not matched errors
app.use(middleware_1.notFoundMiddleware);
// Looking for errors inside existing route
app.use(middleware_1.errorMiddleware);
app.listen(port, () => {
    console.log(`Server is listening on port: ${colors_1.default.bgMagenta(port.toString())}`);
});
