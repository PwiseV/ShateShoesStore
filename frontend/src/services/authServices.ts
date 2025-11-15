import api from "./axios";

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export interface AuthResponse {
  user: User;
  message?: string;
}

// --- Login ---
export const login = async (params: LoginParams): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", params);
    return response.data; 
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// --- Signup ---
export const signup = async (params: SignupParams): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>("/auth/register", params);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// --- Logout ---
export const logout = async (): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// --- Refresh token ---
export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/refresh-token");
    return response.data;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};
