// src/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../services/authServices";
import { refreshToken, signout as apiLogout } from "../services/authServices";
import { removeAccessToken } from "../services/tokenServices";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const auth = await refreshToken();
        setUser(auth.user);
        
        // Lưu userId vào localStorage khi refresh token
        if (auth.user?.id) {
          localStorage.setItem("userId", auth.user.id);
        }
      } catch (error: any) {
        console.error("Auth initialization error:", error.message);
        setUser(null);
        localStorage.removeItem("userId");
        
        // KHÔNG hiển thị toast khi init, vì user có thể chưa login
        // Chỉ log error để debug
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Clear all auth data
      setUser(null);
      removeAccessToken();
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
