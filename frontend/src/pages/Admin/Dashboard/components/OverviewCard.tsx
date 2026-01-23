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

const OverviewCard = () => {
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
  });
  return (
    <Paper
      sx={{
        backgroundColor: "#91A2AF",
        borderRadius: "20px",
        padding: "10px",
        pt: 4,
        width: "100%",
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
        sx={{
          backgroundColor: "#E6E4E4",
          borderRadius: "30px",
          alignItems: "center",
          gap: 2,
          display: "flex",
          mb: 2,
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
          <Typography
            sx={{
              fontSize: "0.9rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              width: "100%",
              textAlign: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <GroupOutlinedIcon sx={{ mr: 1, fontSize: "large" }} />
            Customers
          </Typography>
          <Typography
            sx={{
              fontSize: "2.6rem",
              lineHeight: 1,
            }}
          >
            {overview?.sumCustomers}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TrendIndicator value={overview?.customerTrend} />
          </Box>
        </Paper>

        {/* Balance section */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#E6E4E4",
            borderRadius: "30px",
            padding: "20px",
            width: "200px",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.9rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              width: "100%",
              textAlign: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <AccountBalanceWalletOutlinedIcon
              sx={{ mr: 1, fontSize: "large" }}
            />
            Balance
          </Typography>
          <Typography
            sx={{
              fontSize: "2.6rem",
              lineHeight: 1,
            }}
          >
            {overview?.balanceAmount}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TrendIndicator value={overview?.balanceTrend} />
          </Box>
        </Paper>
      </Paper>

      {/* New Customers header */}
      <Typography
        sx={{
          fontSize: "0.9rem",
          fontWeight: 600,
          ml: 2,
          textAlign: "left",
        }}
      >
        {newCustomers.length} new customers today!
      </Typography>
      <Typography
        sx={{
          fontSize: "0.8rem",
          mb: 1,
          ml: 2,
          textAlign: "left",
        }}
      >
        Send a welcome message to all new customers
      </Typography>
      <Box sx={{ display: "flex", mt: 3.25, ml: 1, mb: 0.7, gap: 3 }}>
        {newCustomers.slice(0, 4).map((c) => (
          <Box sx={{ alignItems: "center" }}>
            <Avatar alt={c.id} src={c.avatar} sx={{ width: 60, height: 60 }} />
            <Typography
              sx={{
                fontSize: "0.7rem",
                textAlign: "center",
                mt: 1,
              }}
            >
              {c.username}
            </Typography>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#BDBDBD",
              borderRadius: "50%",
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 0,
              minWidth: 0,
            }}
          >
            <AddIcon />
          </Button>

          <Typography sx={{ fontSize: "0.7rem", textAlign: "center", mt: 1 }}>
            View all
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
export default OverviewCard;
