import express, { Router } from "express";

import { Auth } from "controllers";

import { protectRoute } from "middleware";

const router: Router = express.Router();

router.get("/", protectRoute, Auth.getUsers);
router.post("/login", Auth.login);
router.post("/register", Auth.register);
router.put("/:id", protectRoute, Auth.update);
router.put("/password/:id", protectRoute, Auth.updatePassword);
router.delete("/:id", protectRoute, Auth.remove);

export { router as authRoutes };
