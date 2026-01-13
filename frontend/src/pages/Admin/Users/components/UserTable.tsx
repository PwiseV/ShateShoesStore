import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import type { User } from "../type";
import { STATUS_LABELS } from "../constants";
import { getStatusColor } from "../utils";

interface Props {
  loading: boolean;
  users: User[];
  onEdit: (user: User) => void;
}

const UserTable: React.FC<Props> = ({ loading, users, onEdit }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const renderAddress = (user: User) => {
    if (!user.addresses || user.addresses.length === 0) return "Chưa cập nhật";
    const addr = user.addresses[0];
    return `${addr.street}, ${addr.city}`;
  };

  const fontStyle = { fontFamily: "'Lexend', sans-serif", fontSize: "13px" };
  const headerStyle = {
    ...fontStyle,
    fontWeight: 600,
    color: "#666",
    fontSize: "12px",
    textTransform: "uppercase" as const,
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "12px",
        boxShadow: "none",
        overflowX: "auto",
        border: "1px solid #eee",
      }}
    >
      <Table sx={{ minWidth: 800 }} aria-label="user table" size="small">
        <TableHead sx={{ backgroundColor: "#F8F9FA", height: "40px" }}>
          <TableRow>
            <TableCell sx={{ ...headerStyle, width: "50px" }}>ID</TableCell>

            {/* CẬP NHẬT: Tăng minWidth cho cột Họ Tên để chiếm khoảng trống */}
            <TableCell sx={{ ...headerStyle, minWidth: "100px" }}>
              Họ Tên
            </TableCell>

            <TableCell sx={headerStyle}>Email</TableCell>
            <TableCell sx={headerStyle}>SĐT</TableCell>
            <TableCell sx={headerStyle}>Địa chỉ</TableCell>
            <TableCell sx={headerStyle}>Chức vụ</TableCell>
            <TableCell sx={headerStyle}>Trạng thái</TableCell>
            <TableCell
              sx={{ ...headerStyle, textAlign: "center", width: "80px" }}
            >
              Tùy chỉnh
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.userId}
              hover
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                height: "48px",
              }}
            >
              <TableCell sx={fontStyle}>#{user.userId}</TableCell>

              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: "#2C3E50", ...fontStyle }}
                >
                  {user.displayName}
                </Typography>
              </TableCell>

              {/* Email: Giữ nguyên nhỏ gọn */}
              <TableCell
                sx={{
                  maxWidth: "120px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#555",
                  ...fontStyle,
                }}
              >
                <Tooltip title={user.email} arrow placement="top">
                  <span>{user.email}</span>
                </Tooltip>
              </TableCell>

              <TableCell sx={{ color: "#555", ...fontStyle }}>
                {user.phone}
              </TableCell>

              {/* Địa chỉ: Giữ nguyên nhỏ gọn */}
              <TableCell
                sx={{
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#555",
                  ...fontStyle,
                }}
              >
                <Tooltip title={renderAddress(user)} arrow placement="top">
                  <span>{renderAddress(user)}</span>
                </Tooltip>
              </TableCell>

              <TableCell sx={fontStyle}>{user.role}</TableCell>

              <TableCell>
                <Typography
                  sx={{
                    color: getStatusColor(user.status),
                    fontWeight: 500,
                    fontSize: "12px",
                    ...fontStyle,
                  }}
                >
                  {STATUS_LABELS[user.status] || user.status}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <IconButton
                    onClick={() => onEdit(user)}
                    size="small"
                    sx={{ color: "#7f8c8d", padding: "4px" }}
                  >
                    <VisibilityOutlinedIcon sx={{ fontSize: "18px" }} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
