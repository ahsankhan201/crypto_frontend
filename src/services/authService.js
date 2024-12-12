import httpClient from "./httpClient";

const AuthService = {
  login: (email, password) => {
    return httpClient.post("/auth/login", { email, password });
  },
  signup: (email, password) => {
    return httpClient.post("/auth/signup", { email, password });
  },
  isTokenExpired: (token) => {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= exp * 1000;
  },
};

export default AuthService;
