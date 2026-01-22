import React from "react";
import { Paper, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "9999px",
        px: 2,
        py: 0.5,
        border: "1px solid #ddd",
        bgcolor: "white",
        maxWidth: 700,
        mx: "auto",
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder="Tìm kiếm ..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#567C8D" }} />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default SearchBar;
