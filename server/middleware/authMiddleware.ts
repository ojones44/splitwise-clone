import asyncHandler from 'express-async-handler';
import { HTTP_STATUS } from 'data';

// Type imports
import { Response, RequestHandler } from 'express';
import { AuthRequest } from 'types';

// Helper Functions
import { verifyToken } from 'utils';

// Error handlers
import { UnauthenticatedError } from 'errors';

const sendNoAuth = (response: Response, msg: string) => {
	response.status(HTTP_STATUS.UNAUTHORIZED);
	throw new UnauthenticatedError(msg);
};

export const protectRoute: RequestHandler = asyncHandler(
	async (req: AuthRequest, res, next) => {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			sendNoAuth(res, 'Authentication failed');
		}

		if (authHeader && authHeader.startsWith('Bearer')) {
			try {
				const token = authHeader.split(' ')[1];
				const decoded = verifyToken(token);
				req.user = { id: decoded.id };
				next();
			} catch (err) {
				sendNoAuth(res, 'Authentication failed');
			}
		} else {
			sendNoAuth(res, 'Not authorized, please try again or login.');
		}
	}
);
