export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export interface AuthResponse {
  user: User;
  message: string;
}

// Fake login
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@example.com" && password === "123456789") {
        resolve({
          user: { id: "1", name: "Admin", email, role: "admin" },
          message: "Đăng nhập thành công",
        });
      } else if (email === "customer@example.com" && password === "123456789") {
        resolve({
          user: { id: "2", name: "Customer", email, role: "customer" },
          message: "Đăng nhập thành công",
        });
      } else {
        reject(new Error("Sai email hoặc mật khẩu"));
      }
    }, 500); 
  });
};

// Fake signup
export const signup = async (name: string, email: string, password: string, confirmPassword: string, check: boolean): Promise<{ message: string }> => {
  if (password !== confirmPassword) {
    return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
  }
  if (!check) {
    return Promise.reject(new Error("Bạn phải đồng ý với các điều khoản"));
  } 
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Đăng kí thành công" });
    }, 500);
  });
};

export const logout = async (): Promise<{ message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Logout successful",
      });
    }, 500); 
  });
};

export const refreshToken = async (): Promise<AuthResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: "1", name: "Admin", email: "admin@example.com", role: "admin" },
        message: "Token refreshed",
      });
    }, 500); 
  });
};