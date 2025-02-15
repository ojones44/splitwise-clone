import express, { Router } from "express";

import { Group } from "controllers";

import { protectRoute } from "middleware";

const router: Router = express.Router();

router.get("/", protectRoute, Group.getAll);
router.post("/", protectRoute, Group.create);
router.delete("/:id", protectRoute, Group.remove);

export { router as groupRoutes };
