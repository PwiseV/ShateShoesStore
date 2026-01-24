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
  Chip,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StarIcon from "@mui/icons-material/Star"; // Icon for default address
import type { User } from "../types";
import { getStatusColor } from "../utils";

interface Props {
  loading: boolean;
  users: User[];
  onEdit: (user: User) => void;
}

const UserTable: React.FC<Props> = ({ loading, users, onEdit }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  // --- LOGIC ADDRESS ---
  const renderAddressCell = (user: User) => {
    if (!user.addresses || user.addresses.length === 0)
      return (
        <Typography
          sx={{ fontSize: "13px", color: "#999", fontStyle: "italic" }}
        >
          Chưa cập nhật
        </Typography>
      );

    const defaultAddr = user.addresses.find((a) => a.isDefault);
    const displayAddr = defaultAddr || user.addresses[0];

    const addrString =
      displayAddr.Address ||
      `${displayAddr.street}, ${displayAddr.ward}, ${displayAddr.district}, ${displayAddr.city}`;

    const extraCount = user.addresses.length - 1;

    const tooltipContent = (
      <div style={{ whiteSpace: "pre-line", fontSize: "12px" }}>
        {user.addresses.map((addr, idx) => (
          <div key={addr.addressId || idx} style={{ marginBottom: "4px" }}>
            {addr.isDefault && "★ "}
            {addr.Address || `${addr.street}, ${addr.city}`}
          </div>
        ))}
      </div>
    );

    return (
      <Tooltip title={tooltipContent} arrow placement="top">
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {displayAddr.isDefault && (
            <StarIcon sx={{ fontSize: 14, color: "#f1c40f", flexShrink: 0 }} />
          )}
          <Typography
            sx={{
              fontSize: "13px",
              color: "#555",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {addrString}
          </Typography>
          {extraCount > 0 && (
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#6A5ACD",
                flexShrink: 0,
              }}
            >
              (+{extraCount})
            </Typography>
          )}
        </Box>
      </Tooltip>
    );
  };

  // --- STYLES CHUNG ---
  const fontStyle = { fontFamily: "'Lexend', sans-serif", fontSize: "13px" };

  // Style cho Header: Chữ đậm, màu xám nhẹ, viết hoa
  const headerStyle = {
    ...fontStyle,
    fontWeight: 700,
    color: "#637381",
    fontSize: "12px",
    textTransform: "uppercase" as const,
    backgroundColor: "#F4F6F8", // Màu nền header nhẹ nhàng hơn
    borderBottom: "1px solid #E0E0E0",
  };

  // Style cho Cell Body: Có border dưới mờ
  const cellStyle = {
    ...fontStyle,
    borderBottom: "1px dashed #EDF2F7", // Border nét đứt hiện đại
    padding: "12px 16px", // Padding rộng rãi hơn
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "16px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)", // Shadow nhẹ
        border: "none",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 900 }} size="medium">
        {" "}
        {/* Dùng medium để thoáng hơn, hoặc small nếu muốn gọn */}
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...headerStyle, minWidth: "120px" }}>
              Username
            </TableCell>

            {/* Tên cần rộng để hiển thị đầy đủ */}
            <TableCell sx={{ ...headerStyle, minWidth: "180px" }}>
              Họ Tên
            </TableCell>

            {/* Email và Địa chỉ có thể dài nên cần maxWidth */}
            <TableCell
              sx={{ ...headerStyle, minWidth: "180px", maxWidth: "220px" }}
            >
              Email
            </TableCell>

            <TableCell sx={{ ...headerStyle, minWidth: "110px" }}>
              SĐT
            </TableCell>

            <TableCell
              sx={{ ...headerStyle, minWidth: "200px", maxWidth: "300px" }}
            >
              Địa chỉ (Mặc định)
            </TableCell>

            <TableCell
              sx={{ ...headerStyle, minWidth: "130px", textAlign: "center" }}
            >
              Vai trò
            </TableCell>

            <TableCell
              sx={{ ...headerStyle, minWidth: "130px", textAlign: "center" }}
            >
              Trạng thái
            </TableCell>

            <TableCell
              sx={{ ...headerStyle, minWidth: "80px", textAlign: "center" }}
            >
              Tùy chỉnh
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.username}
              hover
              sx={{
                "&:hover": { backgroundColor: "#F9FAFB !important" },
                transition: "background-color 0.2s",
              }}
            >
              {/* Username */}
              <TableCell
                sx={{ ...cellStyle, fontWeight: 600, color: "#2C3E50" }}
              >
                {user.username}
              </TableCell>

              {/* Họ tên */}
              <TableCell sx={{ ...cellStyle, fontWeight: 600 }}>
                {user.displayName}
              </TableCell>

              {/* Email - Tự động truncate bằng CSS */}
              <TableCell sx={{ ...cellStyle, maxWidth: "220px" }}>
                <Tooltip title={user.email} arrow placement="top">
                  <Typography
                    sx={{
                      ...fontStyle,
                      color: "#555",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.email}
                  </Typography>
                </Tooltip>
              </TableCell>

              {/* SĐT */}
              <TableCell sx={{ ...cellStyle, color: "#555" }}>
                {user.phone}
              </TableCell>

              {/* Địa chỉ */}
              <TableCell
                sx={{ ...cellStyle, maxWidth: "300px", cursor: "help" }}
              >
                {renderAddressCell(user)}
              </TableCell>

              {/* Vai trò - Center */}
              <TableCell sx={{ ...cellStyle, textAlign: "center" }}>
                <Chip
                  label={user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
                  size="small"
                  color={user.role === "admin" ? "primary" : "default"}
                  variant={user.role === "admin" ? "filled" : "outlined"} // Admin đậm, User nhạt
                  sx={{
                    ...fontStyle,
                    fontWeight: 600,
                    fontSize: "11px",
                    height: "24px",
                    bgcolor: user.role === "admin" ? "#567C8D" : "transparent", // Màu custom cho admin
                    color: user.role === "admin" ? "#fff" : "inherit",
                    borderColor: "#ccc",
                  }}
                />
              </TableCell>

              {/* Trạng thái - Center */}
              <TableCell sx={{ ...cellStyle, textAlign: "center" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "20px",
                    backgroundColor:
                      user.status === "active"
                        ? "rgba(46, 204, 113, 0.1)"
                        : "rgba(231, 76, 60, 0.1)",
                    color: getStatusColor(user.status),
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "11px",
                      fontFamily: "'Lexend', sans-serif",
                    }}
                  >
                    {user.status === "active" ? "Khả dụng" : "Bị chặn"}
                  </Typography>
                </Box>
              </TableCell>

              {/* Tùy chỉnh */}
              <TableCell sx={{ ...cellStyle, textAlign: "center" }}>
                <IconButton
                  onClick={() => onEdit(user)}
                  size="small"
                  sx={{
                    color: "#637381",
                    "&:hover": {
                      color: "#567C8D",
                      backgroundColor: "rgba(86, 124, 141, 0.1)",
                    },
                  }}
                >
                  <VisibilityOutlinedIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
