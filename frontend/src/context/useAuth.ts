import { useContext } from "react";
import { AuthContext, type AuthContextType } from "./authContext.tsx";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within AuthProvider");
  return context;
};
