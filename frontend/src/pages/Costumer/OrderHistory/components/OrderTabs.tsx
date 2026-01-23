import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

// Định nghĩa kiểu dữ liệu cho props counts
type OrderCounts = {
  all: number;
  pending: number;
  shipping: number;
  delivered: number;
  cancelled: number;
};

type Props = {
  value: number;
  onChange: (newValue: number) => void;
  counts: OrderCounts;
};

const OrderTabs: React.FC<Props> = ({ value, onChange, counts }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };

  const tabs = [
    { label: "Tất cả", count: counts.all },
    { label: "Chờ xác nhận", count: counts.pending },
    { label: "Vận chuyển", count: counts.shipping },
    { label: "Thành công", count: counts.delivered },
    { label: "Đã hủy", count: counts.cancelled },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          bgcolor: "#F5EFEB",
          borderRadius: "50px",
          p: 0.75,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: "unset",
            "& .MuiTabs-indicator": { display: "none" },
            "& .MuiTabs-flexContainer": { gap: 1 },
          }}
        >
          {tabs.map((item, index) => {
            const isSelected = value === index;
            return (
              <Tab
                key={index}
                disableRipple
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {item.label}

                    {/* [CẬP NHẬT] Chỉ hiển thị số lượng khi Tab đang được chọn (isSelected) */}
                    {isSelected && item.count > 0 && (
                      <Box
                        sx={{
                          bgcolor: "#2C3E50",
                          color: "#fff",
                          fontSize: "0.75rem",
                          minWidth: 20,
                          height: 20,
                          px: 0.5,
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          lineHeight: 1,
                          transition: "all 0.2s ease",
                          // Hiệu ứng fade in nhẹ khi xuất hiện
                          animation: "fadeIn 0.3s ease-in",
                          "@keyframes fadeIn": {
                            "0%": { opacity: 0, transform: "scale(0.8)" },
                            "100%": { opacity: 1, transform: "scale(1)" },
                          },
                        }}
                      >
                        {item.count}
                      </Box>
                    )}
                  </Box>
                }
                sx={{
                  textTransform: "none",
                  fontWeight: isSelected ? 800 : 500,
                  fontSize: "1rem",
                  fontFamily: '"Lexend", sans-serif',
                  color: isSelected ? "#2C3E50 !important" : "#546E7A",
                  bgcolor: isSelected ? "white" : "transparent",
                  borderRadius: "30px",
                  px: 3,
                  py: 1.2,
                  minHeight: "unset",

                  // Shadow nhẹ thay vì border
                  boxShadow: isSelected ? "0 2px 5px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.2s ease",
                  outline: "none !important",
                  "&:hover": {
                    bgcolor: isSelected ? "white" : "rgba(255,255,255,0.5)",
                  },
                }}
              />
            );
          })}
        </Tabs>
      </Box>
    </Box>
  );
};

export default OrderTabs;
