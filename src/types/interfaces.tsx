import { categories } from '../utils/categories';

export type CategoryName = 'holiday' | 'food' | 'home' | 'other';
export type CategoryIcon = React.ReactNode;

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
