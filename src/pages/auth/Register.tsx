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
import {
  RegisterError,
  RegisterUserAlerts,
  User,
} from "../../utils/interfaces/SKG";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const { registerUser, registerUserData } = useUser();
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
    name: "",
    surname: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const registerError = registerUserData?.response as
    | RegisterUserAlerts
    | RegisterError
    | null;

  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const comparePasswords = () => {
    return userData.password === confirmPassword;
  };

  const isPasswordBelowMinLength = () => {
    return userData.password.length < 8;
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
          height: "max-content",
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
          Sign Up
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerUser(userData);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <FormControl>
            <FormLabel>First name *</FormLabel>
            <Input
              disabled={registerUserData?.isLoading}
              name="name"
              onChange={handleInput}
              placeholder="Enter First name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input
              disabled={registerUserData?.isLoading}
              name="surname"
              onChange={handleInput}
              placeholder="Enter Last name"
            />
          </FormControl>
          <FormControl error={registerError?.message === "User already exists"}>
            <FormLabel>Username *</FormLabel>
            <Input
              disabled={registerUserData?.isLoading}
              name="username"
              onChange={handleInput}
              placeholder="Enter Username"
            />
            {registerError?.message === "User already exists" && (
              <FormHelperText>
                This Username already taken by another user
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            color={
              (userData.password.trim() &&
                isPasswordBelowMinLength() &&
                "warning") ||
              (userData.password.trim() &&
                confirmPassword.trim() &&
                !comparePasswords() &&
                "warning") ||
              "neutral"
            }
          >
            <FormLabel>Password *</FormLabel>
            <Input
              disabled={registerUserData?.isLoading}
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
            {userData.password.trim() && isPasswordBelowMinLength() && (
              <FormHelperText>
                Password must be at least 8 characters long
              </FormHelperText>
            )}
            {userData.password.trim() &&
              confirmPassword.trim() &&
              !comparePasswords() && (
                <FormHelperText>Passwords do not match</FormHelperText>
              )}
          </FormControl>
          <FormControl
            color={
              (userData.password.trim() &&
                confirmPassword.trim() &&
                !comparePasswords() &&
                "warning") ||
              "neutral"
            }
          >
            <FormLabel>Confirm Password *</FormLabel>
            <Input
              disabled={registerUserData?.isLoading}
              name="confirmPassword"
              onChange={handleConfirmPassword}
              placeholder="Enter Confirm Password"
              type={showPassword ? "text" : "password"}
              endDecorator={
                <IconButton onClick={handleTogglePassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />
            {userData.password.trim() &&
              confirmPassword.trim() &&
              !comparePasswords() && (
                <FormHelperText>Passwords do not match</FormHelperText>
              )}
          </FormControl>
          <Button
            disabled={
              !userData.name.trim() ||
              !userData.username.trim() ||
              !userData.password.trim() ||
              registerUserData?.isLoading ||
              !comparePasswords() ||
              isPasswordBelowMinLength()
            }
            type="submit"
          >
            {registerUserData?.isLoading ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </Sheet>
    </Box>
  );
}

export default Login;
