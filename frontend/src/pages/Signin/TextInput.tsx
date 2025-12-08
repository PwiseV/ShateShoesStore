import { TextField } from "@mui/material";

interface RoundedInputProps {
  label: string;
  value: string;
  setValue: (val: string) => void;
  type?: string;
  placeholder?: string;
}

const RoundedInput: React.FC<RoundedInputProps> = ({
  label,
  value,
  setValue,
  type = "text",
  placeholder,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
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
        }
      }}
    />
  );
};

export default RoundedInput;
