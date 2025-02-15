"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("controllers");
const middleware_1 = require("middleware");
const router = express_1.default.Router();
exports.expenseRoutes = router;
router.post("/", middleware_1.protectRoute, controllers_1.Expense.create);
router.delete("/:id", middleware_1.protectRoute, controllers_1.Expense.remove);
