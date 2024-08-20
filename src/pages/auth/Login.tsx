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
} from "@mui/joy";
import { useUser } from "../../context/Users";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../../utils/defaults";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginUser, loginUserData } = useUser();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  interface LoginSuccess {
    message: "Login successful";
    token: string;
  }

  interface LoginUserAlerts {
    message: "Invalid credentials";
  }

  interface LoginError {
    message: "Error logging in";
    error: unknown;
  }

  const loginResponse = loginUserData?.data as LoginSuccess | null;
  const loginError = loginUserData?.response as
    | LoginUserAlerts
    | LoginError
    | null;

    console.log(loginUserData?.response);
    

  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
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
              name="password"
              onChange={handleInput}
              placeholder="Enter Password"
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
