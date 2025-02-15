// Imports
import asyncHandler from 'express-async-handler';
import { HTTP_STATUS } from 'data';
import _ from 'lodash';
import { hashPassword, comparePassword, generateToken } from 'utils';

// Type imports
import { AuthRequest } from 'types';

// Database
import { User } from 'models';

// Error handlers
import { BadRequestError, UnauthenticatedError } from 'errors';

// Managing login and registration

// @description   Get users list
// @route         GET /api/auth
// @access        Private
export const getUsers = asyncHandler(async (_req, res) => {
	const users = await User.find({}).select('-password');
	res.status(HTTP_STATUS.OK).json({ users });
});

// @description   Login user
// @route         POST /api/auth/login
// @access        Public
export const login = asyncHandler(async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			throw new BadRequestError('Please provide email and password.');
		}

		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			throw new BadRequestError('Invalid login credentials.');
		}

		const passwordMatched = await comparePassword(password, user.password);

		if (user && passwordMatched) {
			res.status(HTTP_STATUS.OK).json({
				_id: user.id,
				name: user.name,
				email: user.email,
				token: generateToken(user.id),
			});
		} else {
			throw new UnauthenticatedError('Invalid login credentials.');
		}
	} catch (error) {
		next(error);
	}
});

// @description   Register user
// @route         POST /api/auth/register
// @access        Public
export const register = asyncHandler(async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			throw new BadRequestError('Please provide data in all fields');
		}

		if (password && password.length < 8) {
			throw new BadRequestError(
				'Invalid password, must be at least 8 characters'
			);
		}

		const userAlreadyRegistered = await User.findOne({
			email: _.toLower(email),
		});

		if (userAlreadyRegistered) {
			throw new BadRequestError('Already registered. Please login.');
		}

		const newUser = await User.create({
			name: _.startCase(_.toLower(name)),
			email: _.toLower(email),
			password: password && (await hashPassword(password)),
		});

		res.status(HTTP_STATUS.OK).json({
			_id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			token: generateToken(newUser.id),
		});
	} catch (error) {
		next(error);
	}
});

// @description   Update user details
// @route         PUT /api/auth/:id
// @access        Private
export const updateUser = asyncHandler(async (req: AuthRequest, res, next) => {
	try {
		if (!req.body.name || !req.body.email) {
			res.status(HTTP_STATUS.BAD);
			throw new BadRequestError('Please provide all values');
		}

		const { name, email } = req.body;
		const user = await User.findById(req.user?.id).select('-password');

		if (!user) {
			res.status(HTTP_STATUS.BAD);
			throw new BadRequestError('User not found');
		}

		user.name = req.body.name ? name || req.body.name : user.name;
		user.email = req.body.email ? email || req.body.email : user.email;
		await user.save();

		res.status(HTTP_STATUS.OK).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} catch (error) {
		next(error);
	}
});

// @description   Update user password
// @route         PUT /api/auth/password/:id
// @access        Private
export const updatePassword = asyncHandler(
	async (req: AuthRequest, res, next) => {
		try {
			const { oldPassword, newPassword, confirmPassword } = req.body;

			if (!oldPassword || !newPassword || !confirmPassword) {
				res.status(HTTP_STATUS.BAD);
				throw new BadRequestError('Please provide all fields');
			}

			const user = await User.findById(req.user?.id).select('+password');

			if (!user) {
				res.status(HTTP_STATUS.BAD);
				throw new BadRequestError('User not found');
			}

			const oldPasswordMatched = await comparePassword(
				oldPassword,
				user.password
			);

			if (!oldPasswordMatched) {
				res.status(HTTP_STATUS.BAD);
				throw new BadRequestError('Old password is incorrect');
			}

			const newPasswordValid = newPassword === confirmPassword;
			const isSameAsOldPassword = newPassword === oldPassword;

			if (!newPasswordValid) {
				res.status(HTTP_STATUS.BAD);
				throw new BadRequestError('New password fields do not match');
			}

			if (isSameAsOldPassword) {
				res.status(HTTP_STATUS.BAD);
				throw new BadRequestError(
					'New password cannot be the same as old password'
				);
			}

			if (oldPasswordMatched && newPasswordValid) {
				user.password = await hashPassword(newPassword);
				await user.save();
				res.status(HTTP_STATUS.OK).json('Password successfully changed');
			}
		} catch (error) {
			next(error);
		}
	}
);

// @description   Delete user
// @route         DELETE /api/auth/:id
// @access        Private
export const deleteUser = asyncHandler(async (req: AuthRequest, res, next) => {
	try {
		const user = await User.findById(req.user?.id).select('-password');

		if (!user) {
			res.status(HTTP_STATUS.BAD);
			throw new BadRequestError('User not found');
		}
		await User.findByIdAndDelete(user.id);
		res.status(HTTP_STATUS.OK).json(`User with id ${user.id} has been deleted`);
	} catch (error) {
		next(error);
	}
});
