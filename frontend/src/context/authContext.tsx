// src/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../services/authServices";
import { refreshToken, signout as apiLogout } from "../services/authServices";

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
  const initAuth = async () => {
    try {
      // KHÔNG gọi refresh nếu không có cookie session
      const hasSession = document.cookie.includes("refreshToken");
      if (!hasSession) {
        setUser(null);
        return;
      }

      const auth = await refreshToken();
      setUser(auth.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  initAuth();
}, []);


  // Logout function
  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
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
