// Mock Toast Context or Helper
export const useToast = () => {
  return {
    showToast: (msg: string, type: "success" | "error") => {
      console.log(`[${type.toUpperCase()}] ${msg}`);
      // Trong thực tế bạn có thể integrate library toastify ở đây
    },
  };
};
