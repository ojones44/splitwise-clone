import express, { Router } from 'express';

import {
	getUsers,
	login,
	register,
	updateUser,
	updatePassword,
	deleteUser,
} from 'controllers';

import { protectRoute } from 'middleware';

const router: Router = express.Router();

router.get('/', protectRoute, getUsers);
router.post('/login', login);
router.post('/register', register);
router.put('/:id', protectRoute, updateUser);
router.put('/password/:id', protectRoute, updatePassword);
router.delete('/:id', protectRoute, deleteUser);

export { router as authRoutes };
