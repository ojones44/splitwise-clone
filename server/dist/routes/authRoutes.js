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
router.get('/', middleware_1.protectRoute, controllers_1.getUsers);
router.post('/login', controllers_1.login);
router.post('/register', controllers_1.register);
router.put('/:id', middleware_1.protectRoute, controllers_1.updateUser);
router.put('/password/:id', middleware_1.protectRoute, controllers_1.updatePassword);
router.delete('/:id', middleware_1.protectRoute, controllers_1.deleteUser);
