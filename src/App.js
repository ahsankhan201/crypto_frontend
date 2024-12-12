import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { jwtDecode } from "jwt-decode";
import { isUserLoggedIn } from "./helpers/auth"

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  const { exp } = jwtDecode(token);
  if (Date.now() >= exp * 1000) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  console.log('Is login',isUserLoggedIn())
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
