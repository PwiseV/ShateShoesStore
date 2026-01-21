import api from "./axios";

// Đổi tên interface cho đúng ngữ cảnh
export interface SolutionDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

/* ============================
   REAL API SERVICES
============================ */

export const submitSolution = async (data: SolutionDTO): Promise<void> => {
  try {
    // Gọi API POST /solutions
    await api.post("/solutions", data);
  } catch (error) {
    console.error("Error submitting solution:", error);
    throw error;
  }
};
