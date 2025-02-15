// Mongoose import
import mongoose, { Schema, Model } from 'mongoose';

// Types
interface UserType {
	// _id: string;
	name: string;
	email: string;
	password: string;
}

// Data types import
import {
	requiredNameString,
	requiredEmailString,
	requiredPasswordString,
} from './dataTypes';

// User model
const userModel = {
	name: requiredNameString,
	email: requiredEmailString,
	password: requiredPasswordString,
};

// Create new schema
const userSchema = new Schema<UserType>(userModel, {
	timestamps: true,
});

// Create mongoose model
export const User = mongoose.model<UserType>('User', userSchema);
