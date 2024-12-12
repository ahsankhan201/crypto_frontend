import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import useDebounce from "../hooks/useDebounce"; // Path to your custom hook

const SearchField = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 2000); // Debounce delay of 500ms

  // Trigger search API only when the debounced value changes
  React.useEffect(() => {
    if (debouncedSearch || debouncedSearch === "") {
      onSearch(debouncedSearch); // Call API
    }
  }, [debouncedSearch, onSearch]);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const clearSearch = () => {
    setSearch("");
    onSearch(""); // Clear search results
  };

  return (
    <TextField
      label="Search by Name or Symbol"
      variant="outlined"
      fullWidth
      value={search}
      onChange={handleSearchChange}
      InputProps={{
        endAdornment: search && (
          <InputAdornment position="end">
            <IconButton onClick={clearSearch}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
