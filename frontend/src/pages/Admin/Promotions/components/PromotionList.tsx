import React from "react";
import { Box, Typography, IconButton, Stack, Paper, Grid } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import type { Promotion } from "../types";
import { getStatusColor } from "../utils";

interface PromotionListProps {
  promotions: Promotion[];
  onDelete: (id: number) => void;
  onEdit: (item: Promotion) => void;
}

const PromotionList: React.FC<PromotionListProps> = ({
  promotions,
  onDelete,
  onEdit,
}) => {
  return (
    <Box sx={{ minHeight: 400 }}>
      {/* HEADER BẢNG */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#567C8D",
          color: "#fff",
          px: 2,
          py: 1.5,
          mb: 2,
          borderRadius: "8px",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid size={3}>
            <Typography fontWeight="bold" fontSize={14} pl={1}>
              Mã code
            </Typography>
          </Grid>
          <Grid size={3}>
            <Typography fontWeight="bold" fontSize={14} align="center">
              Thời gian hiệu lực
            </Typography>
          </Grid>
          <Grid size={1.5}>
            <Typography fontWeight="bold" fontSize={14} align="center">
              Tổng SL
            </Typography>
          </Grid>
          <Grid size={1.5}>
            <Typography fontWeight="bold" fontSize={14} align="center">
              Loại
            </Typography>
          </Grid>
          <Grid size={1.5}>
            <Typography fontWeight="bold" fontSize={14} align="center">
              Trạng thái
            </Typography>
          </Grid>
          <Grid size={1.5}>
            <Typography fontWeight="bold" fontSize={14} align="center">
              Hành động
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* DANH SÁCH ITEM */}
      <Stack spacing={1.5}>
        {promotions.map((item) => (
          <Paper
            key={item.id}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: "16px",
              border: "1px solid #F3F4F6",
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                borderColor: "#E5E7EB",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Grid container spacing={2} alignItems="center">
              {/* Code + Description */}
              <Grid size={3}>
                <Box pl={1}>
                  <Typography
                    sx={{ color: "#567C8D", fontWeight: 700, fontSize: 14 }}
                  >
                    {item.code}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>

              {/* Date */}
              <Grid size={3} textAlign="center">
                <Box>
                  <Typography fontSize={13} color="#6B7280">
                    {item.startDate}
                  </Typography>
                  <Typography fontSize={13} color="#6B7280">
                    {item.endDate}
                  </Typography>
                </Box>
              </Grid>

              {/* Total Quantity */}
              <Grid size={1.5} textAlign="center">
                <Typography color="#2C3E50" fontWeight={600} fontSize={14}>
                  {item.totalQuantity}
                </Typography>
              </Grid>

              {/* Remaining Quantity */}
              <Grid size={1.5} textAlign="center">
                <Typography fontSize={13} color="#6B7280">
                  {item.discountType}
                </Typography>
              </Grid>

              {/* Status */}
              <Grid size={1.5} textAlign="center">
                <Typography
                  sx={{
                    color: getStatusColor(item.status),
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {item.status}
                </Typography>
              </Grid>

              {/* Actions */}
              <Grid size={1.5} display="flex" justifyContent="center" gap={0.5}>
                {/* Thêm onClick gọi onEdit */}
                <IconButton
                  size="small"
                  sx={{ color: "#567C8D" }}
                  onClick={() => onEdit(item)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => onDelete(item.id)}
                  sx={{ color: "#E74C3C" }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default PromotionList;
