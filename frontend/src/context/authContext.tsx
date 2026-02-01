// src/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../services/authServices";
import { refreshToken, signout as apiLogout } from "../services/authServices";
import { removeAccessToken } from "../services/tokenServices";
import FullScreenLoader from "../components/Loading";

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
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const auth = await refreshToken();
        setUser(auth.user);

        if (auth.user?.id) {
          localStorage.setItem("userId", auth.user.id);
        }
      } catch (error: any) {
        console.error("Auth initialization error:", error.message);
        setUser(null);
        localStorage.removeItem("userId");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = async () => {
    setLoggingOut(true);

    try {
      await apiLogout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      removeAccessToken();
      localStorage.removeItem("userId");

      setTimeout(() => {
        window.location.href = "/";
      }, 600);
    }
  };

  if (loading || loggingOut) {
    return <FullScreenLoader />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
