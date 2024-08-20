"use client";

import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import users from "../services/api/skg/users.api.service";
import { getCookie, setCookie } from "../utils/defaults";
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

interface ResponseType {
  isLoading: boolean;
  data?:
    | User
    | User[]
    | { message: string }
    | RegisterUserResponse
    | LoginSuccess
    | null
    | [];
  response?: {
    data:
      | RegisterUserAlerts
      | RegisterError
      | LoginUserAlerts
      | LoginError
      | { message: string }
      | null;
  };
}

const UserContext = createContext({
  registerUser: async (props: User) => {
    props;
  },
  loginUser: async (props: LoginUserProps) => {
    props;
  },
  getMyself: async () => {},
  updateMyself: async (props: User) => {
    props;
  },
  deleteMyself: async () => {},
  getUsers: async () => {},
  getUserById: async (id: string) => {
    id;
  },
  updateUser: async (id: string, props: User) => {
    {
      id;
    }
    {
      props;
    }
  },
  deleteUser: async (id: string) => {
    id;
  },
  registerUserData: null as ResponseType | null,
  loginUserData: null as ResponseType | null,
  getMyselfData: null as ResponseType | null,
  updateMyselfData: null as ResponseType | null,
  deleteMyselfData: null as ResponseType | null,
  getUsersData: null as User[] | ResponseType | null,
  getUserByIdData: null as User | ResponseType | null,
  updateUserData: null as ResponseType | null,
  deleteUserData: null as ResponseType | null,
});
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [registerUserData, setRegisterUserData] = useState<ResponseType | null>(
    null
  );
  const [loginUserData, setLoginUserData] = useState<ResponseType | null>(null);
  const [getMyselfData, setGetMyselfData] = useState<ResponseType | null>(null);
  const [updateMyselfData, setUpdateMyselfData] = useState<ResponseType | null>(
    null
  );
  const [deleteMyselfData, setDeleteMyselfData] = useState<ResponseType | null>(
    null
  );
  const [getUsersData, setGetUsersData] = useState<ResponseType | null>(null);
  const [getUserByIdData, setGetUserByIdData] = useState<ResponseType | null>(
    null
  );
  const [updateUserData, setUpdateUserData] = useState<ResponseType | null>(
    null
  );
  const [deleteUserData, setDeleteUserData] = useState<ResponseType | null>(
    null
  );

  const registerUser = async (props: User) => {
    try {
      setRegisterUserData({
        isLoading: true,
      });
      const response = await users.RegisterUser(props);
      if (response) {
        setRegisterUserData({
          data: response as RegisterUserResponse,
          isLoading: false,
          response: { data: response as RegisterUserAlerts | RegisterError },
        });
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
      setLoginUserData({
        isLoading: true,
      });
      const response = await users.LoginUser(data);
      if (response) {
        setLoginUserData({
          data: response as LoginSuccess,
          isLoading: false,
          response: { data: response as LoginUserAlerts | LoginError },
        });

        if ("token" in response) {
          setCookie("authToken", response.token);
        }
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
      setGetMyselfData({
        isLoading: true,
      });
      const response = await users.GetMyself();
      if (response) {
        setGetMyselfData({
          data: response as User,
          isLoading: false,
          response: {
            data: response as
              | { message: "User not found" }
              | { message: "Error fetching user" },
          },
        });
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
      setUpdateMyselfData({
        isLoading: true,
        data: null,
      });
      const response = await users.UpdateMyself(data);
      if (response) {
        setUpdateMyselfData({
          data: response as { message: "User updated successfully" },
          isLoading: false,
          response: { data: response as { message: "Error updating user" } },
        });
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
      setDeleteMyselfData({
        isLoading: true,
        data: null,
      });
      const response = await users.DeleteMySelf();
      if (response) {
        setDeleteMyselfData({
          isLoading: false,
          data: response as { message: "User deleted successfully" },
          response: { data: response as { message: "Error deleting user" } },
        });
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
      setGetMyselfData({
        isLoading: true,
        data: null,
      });
      const response = await users.GetUsers();
      if (response) {
        setGetUsersData({
          isLoading: false,
          data: response as User[],
          response: {
            data: response as { message: "Error fetching users" },
          },
        });
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
      setGetUserByIdData({
        isLoading: true,
        data: null,
      });
      const response = await users.GetUserById(id);
      if (response) {
        setGetUserByIdData({
          isLoading: false,
          data: response as User,
          response: {
            data: response as
              | { message: "Error fetching user" }
              | { message: "User not found" },
          },
        });
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
      setUpdateUserData({
        isLoading: true,
        data: null,
      });
      const response = await users.UpdateUser(id, data);
      if (response) {
        setUpdateUserData({
          isLoading: false,
          data: response as { message: "User updated successfully" },
          response: { data: response as { message: "Error updating user" } },
        });
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
      setDeleteMyselfData({
        isLoading: true,
        data: null,
      });
      const response = await users.DeleteUser(id);
      if (response) {
        setDeleteUserData({
          isLoading: false,
          data: response as { message: "User deleted successfully" },
          response: { data: response as { message: "Error deleting user" } },
        });
      } else {
        throw new Error("Invalid response from DeleteUser");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setDeleteUserData(null);
    }
  };

  useEffect(() => {
    if (getCookie("authToken").trim() !== "") {
      getMyself();
    }
  }, [getCookie("authToken")]);
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

export default UserProvider;
