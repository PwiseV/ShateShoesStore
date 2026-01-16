import { USER_STATUS } from "./constants";

export const getStatusColor = (status: string) => {
  switch (status) {
    case USER_STATUS.ACTIVE:
      return "#2ECC71"; // Xanh lá
    case USER_STATUS.BLOCKED:
      return "#F1C40F"; // Vàng
    default:
      return "#95A5A6";
  }
};
