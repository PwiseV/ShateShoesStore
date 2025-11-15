// src/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../services/authServices";
import { refreshToken, logout as apiLogout } from "../services/fakeAuthServices";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const auth = await refreshToken();
        setUser(auth.user);
      } catch {
        setUser(null);
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
      setUser(null); 
      window.location.href = "/login"; 
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };