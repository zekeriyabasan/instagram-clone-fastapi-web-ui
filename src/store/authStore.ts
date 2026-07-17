import { create } from "zustand";
import { authService } from "../services/auth.service";
import { storage } from "../utils/storage";
import type { LoginRequest, LoginResponse } from "../types/auth";

interface AuthState {
  user: {
    id: number;
    username: string;
  } | null;

  token: string | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  login: (data: LoginRequest) => Promise<void>;

  logout: () => void;

  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  token: storage.getToken(),

  isAuthenticated: !!storage.getToken(),

  isLoading: false,

  login: async (data) => {
    set({ isLoading: true });

    try {
      const response: LoginResponse = await authService.login(data);

      storage.setToken(response.access_token);

      localStorage.setItem("username", response.username);
      localStorage.setItem("user_id", response.user_id.toString());

      set({
        token: response.access_token,

        user: {
          id: response.user_id,
          username: response.username,
        },

        isAuthenticated: true,

        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    storage.removeToken();

    localStorage.removeItem("username");
    localStorage.removeItem("user_id");

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  initialize: () => {
    const token = storage.getToken();

    const username = localStorage.getItem("username");

    const id = localStorage.getItem("user_id");

    if (token && username && id) {
      set({
        token,

        isAuthenticated: true,

        user: {
          id: Number(id),
          username,
        },
      });
    }
  },
}));
