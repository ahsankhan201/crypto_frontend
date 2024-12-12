import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import CryptoService from "../services/cryptoService";
import CryptoTable from "../components/CryptoTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite, setFavorites } from "../redux/favoritesSlice";
import { isUserLoggedIn } from "../helpers/auth";
import SearchField from "../components/SearchField";

const Home = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1200);

  const fetchCoins = async (currentPage, query = "") => {
    try {
      const response = query
        ? await CryptoService.getFilteredCryptos(query, currentPage)
        : await CryptoService.getCryptos(currentPage);
      setCoins(response.coins);
      // setTotalPages(response.totalPages || 10); // Default total pages
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavCoins = async () => {
    try {
      const favorites = await CryptoService.getFavorites(userId);
      dispatch(setFavorites(favorites.coinIds));
    } catch (error) {
      console.error("Error fetching favorite coins:", error);
    }
  };

  useEffect(() => {
    fetchCoins(page, search);
    fetchFavCoins();
  }, [page, search]);

  const applyFilters = useCallback(() => {
    let filtered = [...coins];

    if (priceFilter) {
      filtered = filtered.filter((coin) =>
        priceFilter === "increase"
          ? coin.price_change_percentage_24h > 0
          : coin.price_change_percentage_24h < 0
      );
    }

    setFilteredCoins(filtered);
  }, [coins, priceFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handlePriceFilterChange = (e) => setPriceFilter(e.target.value);

  const handleSearch = (text) => {
    setSearch(text.trim());
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFavorite = async (coinId) => {
    try {
      await CryptoService.addFavorite(coinId);
      dispatch(addFavorite(coinId));
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  if (loading) {
    return (
      <Box
        fullWidth
        marginTop={20}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      {!isUserLoggedIn() && (
        <Box mb={5} display="flex" justifyContent="end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      )}

      {isUserLoggedIn() && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h3>Cryptocurrency List</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/favorites")}
          >
            View Favorites
          </Button>
        </Box>
      )}

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        my={2}
        alignItems="center"
      >
        <SearchField value={search} onSearch={handleSearch} />

        <FormControl
          variant="outlined"
          sx={{ minWidth: 200, width: { xs: "100%", sm: "auto" } }}
        >
          <InputLabel>Price Change</InputLabel>
          <Select
            value={priceFilter}
            onChange={handlePriceFilterChange}
            label="Price Change"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="increase">Increase</MenuItem>
            <MenuItem value="decrease">Decrease</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <CryptoTable
        data={filteredCoins}
        handleFavorite={handleFavorite}
        handleUnfavorite={() => {}}
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Box>
  );
};

export default Home;
