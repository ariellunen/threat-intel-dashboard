import React from "react";
import { TextField, Button, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ ip, setIp, onSearch }) {
  return (
    <Box display="flex" gap={2} marginBottom={3}>
      <TextField
        variant="outlined"
        placeholder="Enter IP address"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSearch}
        disabled={!ip}
      >
        Check
      </Button>
    </Box>
  );
}
