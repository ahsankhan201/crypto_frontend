import React, { useState } from "react";
import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Link } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { user } = await AuthService.login(email, password);
      localStorage.setItem("token", user.token);
      navigate("/");
    } catch (error) {
      alert(error.data.message);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        width="100%"
        maxWidth="400px"
        p={3}
        borderRadius={2}
        boxShadow={3}
        bgcolor="white"
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link href="/signup" underline="hover">
            Create one
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
