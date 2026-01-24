import { useState, useEffect } from "react";
import { Paper, Typography, Avatar, Box, Button } from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AddIcon from "@mui/icons-material/Add";
import TrendIndicator from "./TrendIndicator";
import {
  type OverviewResponse,
  type NewCustomer,
  getDashboardOverview,
  getDashboardNewCustomers,
} from "../../../../services/adminServices";
import { useToast } from "../../../../context/useToast";
import { useNavigate } from "react-router-dom";

const OverviewCard = () => {
  const navigate = useNavigate();
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [newCustomers, setNewCustomers] = useState<NewCustomer[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewRes, newCustomersRes] = await Promise.all([
          getDashboardOverview(),
          getDashboardNewCustomers(),
        ]);

        setOverview(overviewRes);
        setNewCustomers(newCustomersRes);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
              ? err
              : "Something went wrong";
        showToast(message, "error");
      }
    };

    fetchData();
  }, []); // <--- BẮT BUỘC phải có [] ở đây

  return (
    <Paper
      sx={{
        backgroundColor: "#91A2AF",
        borderRadius: "20px",
        padding: "10px",
        pt: 4,
        width: "100%",
        boxShadow: "none",
      }}
    >
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 700,
          mb: 1,
          ml: 2,
          textAlign: "left",
        }}
      >
        Overview
      </Typography>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#E6E4E4",
          borderRadius: "30px",
          alignItems: "center",
          gap: 2,
          display: "flex",
          mb: 2,
          overflow: "hidden", // Đảm bảo bo góc không bị đè
        }}
      >
        {/* Customer section */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#D4C6C6",
            borderRadius: "30px",
            padding: "20px",
            width: "55%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 4 }}>
            <GroupOutlinedIcon sx={{ mr: 1, fontSize: "large" }} />
            <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
              Customers
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "2.6rem", lineHeight: 1, fontWeight: 500, mb:4 }}>
            {overview?.sumCustomers ?? 0}
          </Typography>
        </Paper>

        {/* Balance section */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "transparent", // Để đồng bộ màu với cha
            padding: "20px",
            flexGrow: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 4 }}>
            <AccountBalanceWalletOutlinedIcon sx={{ mr: 1, fontSize: "large" }} />
            <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
              Balance
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "2.6rem", lineHeight: 1, fontWeight: 500, mb:4 }}>
            {/* Nên format số tiền nếu là tiền tệ */}
            {overview?.balanceAmount?.toLocaleString() ?? 0}
          </Typography>
        </Paper>
      </Paper>

      {/* New Customers header */}
      <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, ml: 2, textAlign: "left" }}>
        {newCustomers.length} new customers today!
      </Typography>
      <Typography sx={{ fontSize: "0.8rem", mb: 1, ml: 2, textAlign: "left" }}>
        Send a welcome message to all new customers
      </Typography>

      <Box sx={{ display: "flex", mt: 3, ml: 1, mb: 1, gap: 2, alignItems: "flex-start", flexWrap: "wrap" }}>
        {newCustomers.slice(0, 4).map((c) => (
          <Box key={c.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 65 }}>
            <Avatar alt={c.username} src={c.avatar} sx={{ width: 60, height: 60 }} />
            <Typography sx={{ fontSize: "0.7rem", textAlign: "center", mt: 1, maxWidth: 70, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {c.username}
            </Typography>
          </Box>
        ))}

        {/* View All Button Area */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            onClick={() => navigate("/admin/users")}
            sx={{
              backgroundColor: "#BDBDBD",
              borderRadius: "50%",
              width: 60,
              height: 60,
              minWidth: 0,
              color: "white",
              "&:hover": { backgroundColor: "#9E9E9E" }
            }}
          >
            <AddIcon />
          </Button>
          <Typography 
            sx={{ fontSize: "0.7rem", textAlign: "center", mt: 1, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
            onClick={() => navigate("/admin/users")}
          >
            View all
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default OverviewCard;