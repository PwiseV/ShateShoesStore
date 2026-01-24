import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  type StepIconProps,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <AssignmentTurnedInIcon fontSize="small" />,
    2: <InventoryIcon fontSize="small" />,
    3: <LocalShippingIcon fontSize="small" />,
    4: <CheckCircleIcon fontSize="small" />,
  };

  return (
    <Box
      sx={{
        bgcolor: active || completed ? "#546E7A" : "#ccc",
        zIndex: 1,
        color: "#fff",
        width: 40,
        height: 40,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s",
        boxShadow: active ? "0 4px 10px rgba(84, 110, 122, 0.4)" : "none",
      }}
    >
      {icons[String(props.icon)]}
    </Box>
  );
};

const steps = [
  "Đặt hàng thành công",
  "Đã giao cho ĐVVC",
  "Đang giao hàng",
  "Giao hàng thành công",
];

const OrderStatusTimeline = ({ status }: { status: string }) => {
  let activeStep = 0;
  if (status === "shipping") activeStep = 2;
  if (status === "delivered") activeStep = 4;
  if (status === "cancelled") activeStep = 0;

  return (
    <Box sx={{ width: "100%", py: 3 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={
          <Box sx={{ flex: 1, height: 2, bgcolor: "#e0e0e0", mt: 2.5 }} />
        }
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default OrderStatusTimeline;
