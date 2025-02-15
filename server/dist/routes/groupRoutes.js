"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("controllers");
const middleware_1 = require("middleware");
const router = express_1.default.Router();
exports.groupRoutes = router;
router.get("/", middleware_1.protectRoute, controllers_1.Group.getAll);
router.post("/", middleware_1.protectRoute, controllers_1.Group.create);
router.delete("/:id", middleware_1.protectRoute, controllers_1.Group.remove);
