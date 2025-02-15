import {
	errorMessage,
	setDefaultError,
	setValidationError,
	setDuplicateError,
} from './errorMessages';

// Type imports
import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
	setDefaultError(err);

	if (err.name === 'ValidationError') {
		setValidationError(err);
	}

	if (err?.code === 11000) {
		setDuplicateError(err);
	}

	res.status(errorMessage.statusCode);
	res.json({ message: errorMessage.message });
	// full_msg: err,
};
