import jwt from 'jsonwebtoken';

// Type imports
import { IDecode } from 'types';

export const generateToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET!) as IDecode;
};
