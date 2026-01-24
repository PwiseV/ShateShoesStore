import axios from "axios";
import { getAccessToken, setAccessToken } from "./tokenServices";

interface FailedQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

/* ======================
   REQUEST INTERCEPTOR
====================== */
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================
   RESPONSE INTERCEPTOR
====================== */
let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Không retry cho các auth endpoints
    const authEndpoints = ['/auth/signin', '/auth/signup', '/auth/refresh-token', '/auth/forgot-password', '/auth/reset-password'];
    const isAuthEndpoint = authEndpoints.some(endpoint => originalRequest.url?.includes(endpoint));

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint // Không retry cho auth endpoints
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post("/auth/refresh-token");
        const newAccessToken = res.data.accessToken;

        setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err: any) {
        processQueue(err, null);
        setAccessToken(null);
        localStorage.removeItem("userId");
        
        // Chỉ redirect nếu đang ở protected route
        const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/homepage', '/products', '/about-us', '/contact-us', '/blog'];
        const currentPath = window.location.pathname;
        const isPublicRoute = publicRoutes.some(route => currentPath.startsWith(route));
        
        if (!isPublicRoute) {
          window.location.href = "/login";
        }
        
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
    error.message = errorMessage;

    return Promise.reject(error);
  }
);

export default api;
