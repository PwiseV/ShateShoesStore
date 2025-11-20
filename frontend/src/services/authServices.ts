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

/* ============================
   SIGN IN
============================ */
export const signin = async (params: LoginParams): Promise<AuthResponse> => {
  try {
    const data = await api.post<AuthResponse>("/auth/signin", params);
    return data;
  } catch (error) {
    console.error("Signin error:", error);
    throw error;
  }
};

/* ============================
   SIGN UP
============================ */
export const signup = async (params: SignupParams): Promise<{ message: string }> => {
  try {
    const data = await api.post<{ message: string }>("/auth/signup", params);
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

/* ============================
   SIGN OUT
============================ */
export const signout = async (): Promise<{ message: string }> => {
  try {
    const data = await api.post<{ message: string }>("/auth/signout");
    return data;
  } catch (error) {
    console.error("Signout error:", error);
    throw error;
  }
};

/* ============================
   REFRESH TOKEN
============================ */
export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const data = await api.post<AuthResponse>("/auth/refresh-token");
    return data;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};
