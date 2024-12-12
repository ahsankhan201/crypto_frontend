import httpClient from "./httpClient";

const CryptoService = {
  getCryptos: (page = 1, perPage = 10) => {
    return httpClient.get("/coins/list", {
      params: { page, perPage },
    });
  },
  getFavorites: () => {
    return httpClient.get("/coins/fav");
  },
  addFavorite: (coinId) => {
    return httpClient.post("/favourite/toogle", { coinId });
  },
  removeFavorite: (coinId) => {
    return httpClient.post("/favourite/toogle", { coinId });
  },

  getFilteredCryptos: (search, page = 1, perPage = 10) => {
    return httpClient.get("/coins/search",{
      params: {search,page, perPage },
  });
  },
};

export default CryptoService;
