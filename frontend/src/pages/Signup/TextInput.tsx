// import React, { type Dispatch, type SetStateAction } from "react";
import { TextField } from "@mui/material";

interface RoundedInputProps {
  label: string;
  value: string;
  setValue: (val: string) => void;
  type?: string;
  placeholder?: string;
  onBlur?: () => void;
}

const RoundedInput: React.FC<RoundedInputProps> = ({
  label,
  value,
  setValue,
  type = "text",
  placeholder,
  onBlur,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      onBlur={onBlur}
      fullWidth
      margin="dense"
      sx={{
        boxShadow: "none",
        "& .MuiOutlinedInput-root": {
          borderRadius: "9999px",
          bgcolor: "common.white",
          "& fieldset": {
            borderColor: "transparent",
          },
          "&:hover fieldset": {
            borderColor: "transparent",
          },
          "&.Mui-focused fieldset": {
            borderColor: "transparent",
          },
        },
        "& .MuiOutlinedInput-input": {
          padding: "8px 16px",
          height: "40px",
          boxSizing: "border-box",
        },
      }}
      InputLabelProps={{
        sx: {
          fontSize: "0.9rem",
          top: "-5px",
          left: 10,
          "&.MuiInputLabel-shrink": {
            top: "0",
          },
        },
      }}
    />
  );
};

export default RoundedInput;
