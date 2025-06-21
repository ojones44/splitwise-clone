"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("controllers");
const middleware_1 = require("middleware");
const router = express_1.default.Router();
exports.authRoutes = router;
router.get("/", middleware_1.protectRoute, controllers_1.Auth.getUsers);
router.get("/validate", middleware_1.protectRoute, controllers_1.Auth.validateUser);
router.post("/login", controllers_1.Auth.login);
router.post("/register", controllers_1.Auth.register);
router.put("/:id", middleware_1.protectRoute, controllers_1.Auth.update);
router.put("/password/:id", middleware_1.protectRoute, controllers_1.Auth.updatePassword);
router.delete("/:id", middleware_1.protectRoute, controllers_1.Auth.remove);
