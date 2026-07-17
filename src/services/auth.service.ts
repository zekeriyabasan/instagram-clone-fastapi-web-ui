import api from "../api/axios";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "../types/auth";

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const formData = new URLSearchParams();

    formData.append("username", data.username);
    formData.append("password", data.password);

    const response = await api.post<LoginResponse>(
      "/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  },

  async register(data: RegisterRequest): Promise<User> {
    const response = await api.post<User>("/users/", data);

    return response.data;
  },
};