import React from "react";
import { Box, Pagination as MuiPagination } from "@mui/material";

type PaginationProps = {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const Pagination = ({ count, page, onChange }: PaginationProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        siblingCount={1}
        boundaryCount={1}
        shape="rounded"
        sx={{
          "& .MuiPagination-ul": {
            gap: "12px",
            alignItems: "center",
          },
          "& .MuiPaginationItem-root": {
            fontFamily: '"Lexend", sans-serif',
            fontSize: "1.1rem",
            fontWeight: 400,
            color: "#2C3E50",
            bgcolor: "transparent",
            border: "none",
            minWidth: "40px",
            height: "40px",
            borderRadius: "50%",
            transition: "all 0.2s",
            "&:hover": {
              bgcolor: "rgba(93, 124, 137, 0.1)",
              color: "#5D7C89",
            },
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            bgcolor: "#5D7C89 !important",
            color: "white",
            fontWeight: 600,
            boxShadow: "0 4px 10px rgba(93, 124, 137, 0.3)",
          },
          "& .MuiPaginationItem-previousNext": {
            fontSize: "1.2rem",
          },
        }}
      />
    </Box>
  );
};

export default Pagination;
