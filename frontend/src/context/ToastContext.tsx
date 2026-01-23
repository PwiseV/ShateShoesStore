// src/context/ToastContext.tsx
import { createContext, useState, type ReactNode, useCallback, useMemo } from "react";
import { Snackbar, Alert } from "@mui/material";

type Severity = "error" | "warning" | "info" | "success";
interface Toast {
  open: boolean;
  message: string;
  severity: Severity;
}
export interface ToastContextType {
  showToast: (message: string, severity?: Severity) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast>({
    open: false,
    message: "",
    severity: "info",
  });

  const showToast = useCallback((message: string, severity: Severity = "info") => {
    setToast({ open: true, message, severity });
    window.setTimeout(() => setToast((t) => ({ ...t, open: false })), 2500);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={toast.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity={toast.severity}
          sx={{
            width: "100%",
            fontSize: "1.3rem",
            padding: "22px 26px",
            borderRadius: "16px",
            minWidth: "380px",
            maxWidth: "500px",
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export { ToastContext };
