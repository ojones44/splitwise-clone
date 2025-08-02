import axios from "axios";
import { create } from "zustand";
import { User } from "../types/interfaces";

const addTokenToLocalStorage = (token: string) =>
  localStorage.setItem("token", token);

type FormData = {
  email: string;
  password: string;
};

type Endpoint = "login" | "register";

interface AuthStore {
  user: null | User;
  setUser: (user: User) => void;
  token: null | string;
  authenticate: (formData: FormData, type?: Endpoint) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  setUser: (user: User) => set({ user }),
  authenticate: async (formData, endpoint = "login") => {
    if (endpoint === "login") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/${endpoint}`,
          formData
        );

        const { user, token } = response.data;

        console.log("data", response.data);

        set({ user, token });

        addTokenToLocalStorage(token);
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    }

    // if (endpoint === "register") {
    // }
  },
}));
