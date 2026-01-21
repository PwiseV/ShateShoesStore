import React from "react";
import { Box, Button } from "@mui/material";

// 1. Định nghĩa kiểu dữ liệu (Types) cho Props
type PaginationProps = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

const Pagination = ({ current, total, onChange }: PaginationProps) => {
  // Style chung cho các nút tròn
  const btnStyle = {
    minWidth: "36px",
    height: "36px",
    borderRadius: "50%",
    p: 0,
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#2C3E50",
    "&:hover": { bgcolor: "#f0f0f0" },
  };

  // Style cho nút đang Active (trang hiện tại)
  const activeStyle = {
    ...btnStyle,
    bgcolor: "#2C3E50",
    color: "white",
    "&:hover": { bgcolor: "#1a252f" },
  };

  // Hàm xử lý khi bấm chuyển trang
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= total) {
      onChange(newPage);
    }
  };

  // Tạo mảng số trang đơn giản [1, 2, 3...]
  // (Lưu ý: Nếu số trang quá lớn bạn cần logic phức tạp hơn để hiện dấu ..., ở đây mình làm đơn giản trước)
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        mt: 4,
        pb: 4, // Thêm padding bottom để không sát đáy
      }}
    >
      {/* Nút Prev */}
      <Button
        variant="text"
        sx={{ ...btnStyle, fontSize: "1.2rem" }}
        disabled={current === 1}
        onClick={() => handlePageChange(current - 1)}
      >
        ‹
      </Button>

      {/* Danh sách các số trang */}
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === current ? "contained" : "text"}
          sx={page === current ? activeStyle : btnStyle}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}

      {/* Nút Next */}
      <Button
        variant="text"
        sx={{ ...btnStyle, fontSize: "1.2rem" }}
        disabled={current === total}
        onClick={() => handlePageChange(current + 1)}
      >
        ›
      </Button>
    </Box>
  );
};

export default Pagination;
