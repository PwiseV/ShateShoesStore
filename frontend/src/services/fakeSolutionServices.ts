import type { SolutionDTO } from "./solutionServices";

/* ============================
   FAKE SERVICES IMPLEMENTATION
============================ */

export const submitSolution = async (data: SolutionDTO): Promise<void> => {
  // Giả lập độ trễ 1.5s
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Giả lập validate
  if (data.email === "error@test.com") {
    throw new Error("Email này bị lỗi, vui lòng thử email khác!");
  }

  console.log("--- [FakeAPI] New Solution Proposal ---");
  console.log("Customer:", `${data.lastName} ${data.firstName}`);
  console.log("Contact:", `${data.phone} - ${data.email}`);
  console.log("Proposal:", data.message);
  console.log("---------------------------------------");

  return; // Thành công
};
