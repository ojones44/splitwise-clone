import { HTTP_STATUS } from 'data';

// Type imports
import { RequestHandler } from 'express';

export const notFoundMiddleware: RequestHandler = (_req, res) => {
	const statusCode: number = HTTP_STATUS.NOT_FOUND;

	res.status(statusCode);
	res.json({
		message: 'Route does not exist',
	});
};
