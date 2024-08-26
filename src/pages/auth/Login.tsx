"use client";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Sheet,
  Typography,
  IconButton,
} from "@mui/joy";
import { useUser } from "../../context/Users";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../../utils/defaults";
import { useNavigate } from "react-router-dom";
import { LoginError, LoginUserAlerts } from "../../utils/interfaces/SKG";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const { loginUser, loginUserData } = useUser();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const loginError = loginUserData?.response as
    | LoginUserAlerts
    | LoginError
    | null;

  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Sheet
        sx={{
          width: "500px",
          height: "400px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          level="h1"
          letterSpacing={1}
          sx={{
            textAlign: "center",
          }}
        >
          Sign In
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser(userData);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <FormControl error={loginError?.message === "Invalid credentials"}>
            <FormLabel>Username</FormLabel>
            <Input
              disabled={loginUserData?.isLoading}
              name="username"
              onChange={handleInput}
              placeholder="Enter Username"
            />
            {loginError?.message === "Invalid credentials" && (
              <FormHelperText>Invalid username or password</FormHelperText>
            )}
          </FormControl>
          <FormControl error={loginError?.message === "Invalid credentials"}>
            <FormLabel>Password</FormLabel>
            <Input
              disabled={loginUserData?.isLoading}
              name="password"
              onChange={handleInput}
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              endDecorator={
                <IconButton onClick={handleTogglePassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />
            {loginError?.message === "Invalid credentials" && (
              <FormHelperText>Invalid username or password</FormHelperText>
            )}
          </FormControl>
          <Button
            disabled={
              !userData.username.trim() ||
              !userData.password.trim() ||
              loginUserData?.isLoading
            }
            type="submit"
          >
            {loginUserData?.isLoading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </Sheet>
    </Box>
  );
}

export default Login;
