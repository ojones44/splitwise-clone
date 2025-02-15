import { Request } from 'express';

// Extend the express Request type to hold an attribute of user.
// This is for when the user ID is passed through auth middleware.
export interface AuthRequest extends Request {
	user?: { id: string };
}
