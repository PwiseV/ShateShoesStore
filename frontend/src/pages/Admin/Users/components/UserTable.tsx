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
// import { STATUS_LABELS } from "../constants"; // Giả sử bạn có file này, nếu ko thì dùng cứng
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

  // Logic hiển thị địa chỉ: Show cái đầu tiên + số lượng còn lại
  const renderAddressCell = (user: User) => {
    if (!user.addresses || user.addresses.length === 0) return "Chưa cập nhật";

    // Địa chỉ chính để hiển thị
    const firstAddr = user.addresses[0];
    const displayText = `${firstAddr.street}, ${firstAddr.city}`;

    // Nếu có nhiều hơn 1 địa chỉ
    const extraCount = user.addresses.length - 1;
    const finalDisplay =
      extraCount > 0 ? `${displayText} (+${extraCount})` : displayText;

    // Nội dung tooltip: Liệt kê tất cả địa chỉ
    const tooltipContent = (
      <div style={{ whiteSpace: "pre-line", fontSize: "12px" }}>
        {user.addresses.map((addr, idx) => (
          <div key={idx} style={{ marginBottom: "4px" }}>
            - {addr.street}, {addr.ward}, {addr.district}, {addr.city}
          </div>
        ))}
      </div>
    );

    return (
      <Tooltip title={tooltipContent} arrow placement="top">
        <span>{finalDisplay}</span>
      </Tooltip>
    );
  };

  // Styles giữ nguyên như cũ
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
            {/* Cột 1: Đổi ID -> Username */}
            <TableCell sx={{ ...headerStyle, width: "100px" }}>
              Username
            </TableCell>

            <TableCell sx={{ ...headerStyle, width: "100px" }}>
              Họ Tên
            </TableCell>
            <TableCell sx={headerStyle}>Email</TableCell>
            <TableCell sx={headerStyle}>SĐT</TableCell>
            <TableCell sx={headerStyle}>Địa chỉ</TableCell>
            <TableCell sx={headerStyle}>Chức vụ</TableCell>
            <TableCell sx={{ ...headerStyle, width: "50px" }}>
              Trạng thái
            </TableCell>
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
              {/* Hiển thị Username*/}
              <TableCell
                sx={{ ...fontStyle, fontWeight: 600, color: "#2C3E50" }}
              >
                {user.username}
              </TableCell>

              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: "#2C3E50", ...fontStyle }}
                >
                  {user.displayName}
                </Typography>
              </TableCell>

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

              {/* Render Địa chỉ với logic mới */}
              <TableCell
                sx={{
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#555",
                  ...fontStyle,
                  cursor: "help", // Icon chuột dấu hỏi nhỏ để gợi ý có tooltip
                }}
              >
                {renderAddressCell(user)}
              </TableCell>

              <TableCell sx={fontStyle}>
                {user.role === "Admin" ? "Quản trị viên" : "Khách hàng"}
              </TableCell>

              <TableCell>
                <Typography
                  sx={{
                    ...fontStyle,
                    color: getStatusColor(user.status),
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                >
                  {user.status === "active" ? "Khả dụng" : "Bị chặn"}
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
