import axios from 'axios';
import { create } from 'zustand';
import { User } from '../types/interfaces';

// type imports
import { AuthStore } from '../types/interfaces';

const addTokenToLocalStorage = (token: string) =>
	localStorage.setItem('token', token);

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	token: null,
	setUser: (user: User) => set({ user }),
	authenticate: async (formData, endpoint = 'login') => {
		try {
			const response = await axios.post(
				`http://localhost:5001/api/auth/${endpoint}`,
				formData
			);

			const { user, token } = response.data;

			console.log('data', response.data);

			set({ user, token });

			addTokenToLocalStorage(token);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new Error(error.response?.data?.message);
			} else {
				throw new Error(error?.message || 'Something went wrong');
			}
		}
	},
}));
