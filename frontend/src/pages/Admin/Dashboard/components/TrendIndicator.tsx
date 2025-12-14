import { Box, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { alpha } from "@mui/material/styles";

const TrendIndicator = ({ value }: { value: number }) => {
  const isUp = value >= 0;

  return (
    <div>
      <Box
        sx={{
          backgroundColor: isUp
            ? alpha("#00aa00", 0.15)
            : alpha("#ff0000", 0.15),
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 0.3,
          borderRadius: "8px",
          width: "fit-content",
          ml: "auto",
          mr: 0,
          mb: 1,
        }}
      >
        {isUp ? (
          <ArrowDropUpIcon sx={{ color: "green" }} />
        ) : (
          <ArrowDropDownIcon sx={{ color: "red" }} />
        )}
        <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
          {Math.abs(value)}%
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "0.7rem", fontWeight: 600, textAlign: "right" }}>
        Since last month
      </Typography>
    </div>
  );
};

export default TrendIndicator;
