import { HTTP_STATUS } from 'data';

interface ExtendedError extends Error {
	statusCode?: number;
	errors?: Error[];
}

export const errorMessage: {
	statusCode: HTTP_STATUS;
	message: string | any[];
} = {
	statusCode: HTTP_STATUS.BAD,
	message: 'Unexpected error. Please try again.',
};

export const setDefaultError = (err: ExtendedError) => {
	(errorMessage.statusCode =
		err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR),
		(errorMessage.message =
			`${err.message}` || 'Something went wrong, please try again later.');
};

export const setValidationError = (err: ExtendedError) => {
	errorMessage.statusCode = HTTP_STATUS.BAD;
	if (err.errors)
		errorMessage.message = `${Object.values(err.errors)
			.map((item) => item.message)
			.join(', ')}`;
};

export const setDuplicateError = (err: { keyValue: { email: string } }) => {
	errorMessage.statusCode = HTTP_STATUS.BAD;
	errorMessage.message = `${err.keyValue.email} already exists. Please login.`;
};
