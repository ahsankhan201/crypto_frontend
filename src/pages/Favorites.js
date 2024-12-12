import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Button } from "@mui/material";
import CryptoService from "../services/cryptoService";
import CryptoTable from "../components/CryptoTable";
import { useDispatch } from "react-redux";
import { setFavorites, removeFavorite } from "../redux/favoritesSlice";
import { useNavigate } from "react-router-dom";

const Favorites = ({ userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favoritedCoins, setFavoritedCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the favorite coins for the user from the API
    const fetchFavorites = async () => {
      try {
        const favorites = await CryptoService.getFavorites(userId);
        setFavoritedCoins(favorites.coins);
        dispatch(setFavorites(favorites.coinIds));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite coins:", error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleUnfavorite = async (coinId) => {
    await CryptoService.removeFavorite(coinId);
    setFavoritedCoins((prevFavorites) =>
      prevFavorites.filter((coin) => coin.id !== coinId)
    );
    dispatch(removeFavorite(coinId));
  };

  const navigateToMainPage = () => {
    navigate("/");
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems={"center"}>
        <h3>Favourites List</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={navigateToMainPage}
        >
          Back to main page
        </Button>
      </Box>
      <CryptoTable
        data={favoritedCoins} // Pass only the favorite coins to the table
        favorites={favoritedCoins.map((coin) => coin.id)} // Assuming the response contains coin IDs
        handleFavorite={() => {}}
        handleUnfavorite={handleUnfavorite}
      />
    </Box>
  );
};

export default Favorites;
