export const useToast = () => {
  return {
    showToast: (msg: string, type: "success" | "error") => {
      // Sau này có thể thay bằng thư viện như react-toastify hay notistack
      console.log(`[${type.toUpperCase()}] ${msg}`);
    },
  };
};
