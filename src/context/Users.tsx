"use client";

import React from "react";
import { createContext, useContext, useState } from "react";
import users from "../services/api/skg/users.api.service";
interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  isAdmin?: boolean;
}
interface RegisterUserResponse {
  message: "User registered successfully";
  token: string;
}
interface RegisterUserAlerts {
  message: "User already exists";
}
interface RegisterError {
  message: "Error registering user";
  error: unknown;
}
interface LoginUserProps {
  username: string;
  password: string;
}

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

const UserContext = createContext({
  registerUser: async (props: User) => {props},
  loginUser: async (props: LoginUserProps) => {props},
  getMyself: async () => {},
  updateMyself: async (props: User) => {props},
  deleteMyself: async () => {},
  getUsers: async () => {},
  getUserById: async (id: string) => {id},
  updateUser: async (id: string, props: User) => {{id} {props}},
  deleteUser: async (id: string) => {id},
  registerUserData: null as RegisterUserResponse | RegisterUserAlerts | RegisterError | null,
  loginUserData: null as LoginSuccess | LoginUserAlerts | LoginError | null,
  getMyselfData: null as User | { message: string } | null,
  updateMyselfData: null as { message: string } | null,
  deleteMyselfData: null as { message: string } | null,
  getUsersData: null as User[] | { message: string } | null,
  getUserByIdData: null as User | { message: string } | null,
  updateUserData: null as { message: string } | null,
  deleteUserData: null as { message: string } | null,
});
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [registerUserData, setRegisterUserData] = useState<
    RegisterUserResponse | RegisterUserAlerts | RegisterError | null
  >(null);
  const [loginUserData, setLoginUserData] = useState<
    LoginSuccess | LoginUserAlerts | LoginError | null
  >(null);
  const [getMyselfData, setGetMyselfData] = useState<
    | User
    | { message: "User not found" }
    | { message: "Error fetching user" }
    | null
  >(null);
  const [updateMyselfData, setUpdateMyselfData] = useState<
    | { message: "User updated successfully" }
    | { message: "Error updating user" }
    | null
  >(null);
  const [deleteMyselfData, setDeleteMyselfData] = useState<
    | { message: "User deleted successfully" }
    | { message: "Error deleting user" }
    | null
  >(null);
  const [getUsersData, setGetUsersData] = useState<
    User[] | { message: "Error fetching users" } | null
  >(null);
  const [getUserByIdData, setGetUserByIdData] = useState<
    | User
    | { message: "User not found" }
    | { message: "Error fetching user" }
    | null
  >(null);
  const [updateUserData, setUpdateUserData] = useState<
    | { message: "User updated successfully" }
    | { message: "Error updating user" }
    | null
  >(null);
  const [deleteUserData, setDeleteUserData] = useState<
    | { message: "User deleted successfully" }
    | { message: "Error deleting user" }
    | null
  >(null);
  const registerUser = async (props: User) => {
    try {
      const response = await users.RegisterUser(props);
      if (response) {
        setRegisterUserData(
          response as RegisterUserResponse | RegisterUserAlerts | RegisterError
        );
      } else {
        throw new Error("Invalid response from RegisterUser");
      }
    } catch (err) {
      console.error("Error registering user:", err);
      setRegisterUserData(null);
    }
  };
  const loginUser = async (data: LoginUserProps) => {
    try {
      const response = await users.LoginUser(data);
      if (response) {
        setLoginUserData(
          response as LoginSuccess | LoginUserAlerts | LoginError
        );
      } else {
        throw new Error("Invalid response from LoginUser");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setLoginUserData(null);
    }
  };
  const getMyself = async () => {
    try {
      const response = await users.GetMyself();
      if (response) {
        setGetMyselfData(
          response as
            | User
            | { message: "User not found" }
            | { message: "Error fetching user" }
        );
      } else {
        throw new Error("Invalid response from GetMyself");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setGetMyselfData(null);
    }
  };
  const updateMyself = async (data: User) => {
    try {
      const response = await users.UpdateMyself(data);
      if (response) {
        setUpdateMyselfData(
          response as
            | { message: "User updated successfully" }
            | { message: "Error updating user" }
        );
      } else {
        throw new Error("Invalid response from UpdateMyself");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setUpdateMyselfData(null);
    }
  };
  const deleteMyself = async () => {
    try {
      const response = await users.DeleteMySelf();
      if (response) {
        setDeleteMyselfData(
          response as
            | { message: "User deleted successfully" }
            | { message: "Error deleting user" }
        );
      } else {
        throw new Error("Invalid response from DeleteMyself");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setDeleteMyselfData(null);
    }
  };
  const getUsers = async () => {
    try {
      const response = await users.GetUsers();
      if (response) {
        setGetUsersData(
          response as User[] | { message: "Error fetching users" }
        );
      } else {
        throw new Error("Invalid response from GetUsers");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setGetUsersData(null);
    }
  };
  const getUserById = async (id: string) => {
    try {
      const response = await users.GetUserById(id);
      if (response) {
        setGetUserByIdData(
          response as
            | User
            | { message: "User not found" }
            | { message: "Error fetching user" }
        );
      } else {
        throw new Error("Invalid response from GetUserById");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setGetUserByIdData(null);
    }
  };
  const updateUser = async (id: string, data: User) => {
    try {
      const response = await users.UpdateUser(id, data);
      if (response) {
        setUpdateUserData(
          response as
            | { message: "User updated successfully" }
            | { message: "Error updating user" }
        );
      } else {
        throw new Error("Invalid response from UpdateUser");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setUpdateUserData(null);
    }
  };
  const deleteUser = async (id: string) => {
    try {
      const response = await users.DeleteUser(id);
      if (response) {
        setDeleteUserData(
          response as
            | { message: "User deleted successfully" }
            | { message: "Error deleting user" }
        );
      } else {
        throw new Error("Invalid response from DeleteUser");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setDeleteUserData(null);
    }
  };
  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        getMyself,
        updateMyself,
        deleteMyself,
        getUsers,
        getUserById,
        updateUser,
        deleteUser,
        registerUserData,
        loginUserData,
        getMyselfData,
        updateMyselfData,
        deleteMyselfData,
        getUsersData,
        getUserByIdData,
        updateUserData,
        deleteUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider