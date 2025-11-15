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
          message: "Login successful",
        });
      } else if (email === "customer@example.com" && password === "123456789") {
        resolve({
          user: { id: "2", name: "Customer", email, role: "customer" },
          message: "Login successful",
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 500); 
  });
};

// Fake signup
export const signup = async (name: string, email: string, password: string): Promise<{ message: string }> => {
  console.log(name, email, password);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Signup successful" });
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