import { jwtDecode } from "jwt-decode";

export const isUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Invalid token", error);
    localStorage.removeItem("token");
    return false;
  }
};
