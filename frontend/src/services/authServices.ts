import api from "./axios";
import { setAccessToken } from "./tokenServices";

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
  accessToken: string;
  message?: string;
}

/* ============================
   SIGN IN
============================ */
export const signin = async (params: LoginParams): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/signin", params);
    if (response?.data.accessToken) {
      setAccessToken(response.data.accessToken);
    }

    return response.data;
  } catch (error) {
    console.error("Signin error:", error);
    throw error;
  }
};

/* ============================
   SIGN UP
============================ */
export const signup = async (
  params: SignupParams
): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>(
      "/auth/signup",
      params
    );
    return response.data;
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
    const response = await api.post<{ message: string }>("/auth/signout");
    return response.data;
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
    const response = await api.post<AuthResponse>("/auth/refresh-token");
    if (response.data?.accessToken) {
      setAccessToken(response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};

/* ============================
   GOOGLE SIGN IN
============================ */

export const googleSignIn = () => {
  window.location.href = "http://localhost:5001/api/auth/google";
  // ĐÚNG: redirect thẳng tới BE
};

export const getMe = async (params?: unknown): Promise<AuthResponse> => {
  try {
    const response = await api.get<AuthResponse>("/auth/me", {
      params: params, // Nếu có query params
    });

    return response.data; // Trả về đúng kiểu User
  } catch (error) {
    console.error("Get me error:", error);
    throw error;
  }
};
