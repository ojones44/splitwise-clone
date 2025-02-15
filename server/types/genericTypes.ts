import { JwtPayload } from 'jsonwebtoken';

export type StringArray = string[];

// Extend JwtPayload type to tell it that there will be an ID attribute.
export interface IDecode extends JwtPayload {
	id: string;
}
