import express, { Router } from "express";

import { Expense } from "controllers";

import { protectRoute } from "middleware";

const router: Router = express.Router();

router.post("/", protectRoute, Expense.create);
router.delete("/:id", protectRoute, Expense.remove);

export { router as expenseRoutes };
