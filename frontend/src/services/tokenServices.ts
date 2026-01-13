export const setAccessToken = (t: string | null) => {
  if (t) {
    localStorage.setItem("accessToken", t); // Lưu vào máy
  } else {
    localStorage.removeItem("accessToken"); // Xóa khi logout
  }
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken"); // Lấy từ máy ra
};

export const hasAccessToken = () => !!localStorage.getItem("accessToken");
