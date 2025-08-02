import { categories } from '../utils/categories';

export type CategoryName = 'holiday' | 'food' | 'home' | 'other';
export type CategoryIcon = React.ReactNode;
export type AuthenticateEndpoint = 'login' | 'register';

export interface User {
	id: string;
	name: string;
	email: string;
}

export interface Category {
	name: string;
	colour: string;
	icons: CategoryIcon[];
}

export interface GroupData {
	id: string;
	name: string;
	category: keyof typeof categories;
	status: string;
}

export interface AddExpense {
	date: Date;
	userId: string;
	groupId: string;
	description: string;
	amount: number;
}

export type Field<T> = {
	value: T;
	isValid: boolean;
	errorMessage?: string;
	type?: 'password' | 'text';
};

export interface LoginFormData {
	name: Field<string>;
	email: Field<string>;
	password: Field<string>;
	confirmPassword?: Field<string>;
}

export interface ProtectedRouteProps {
	children: React.ReactNode;
}

export interface AuthenticateUser {
	email: string;
	password: string;
}

export interface AuthStore {
	user: null | User;
	setUser: (user: User) => void;
	token: null | string;
	authenticate: (
		formData: AuthenticateUser,
		type: AuthenticateEndpoint
	) => Promise<void>;
}
