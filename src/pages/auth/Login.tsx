"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Stack,
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
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              onChange={handleInput}
              placeholder="Enter Username"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              onChange={handleInput}
              placeholder="Enter Password"
            />
          </FormControl>
          <Button type="submit">
            {loginUserData?.isLoading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </Sheet>
    </Box>
  );
}

export default Login;
