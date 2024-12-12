import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    setFavorites: (state, action) => {
      return action.payload; // Overwrite the state with the provided array
    },
    addFavorite: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      return state.filter((id) => id !== action.payload);
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
