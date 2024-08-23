"use client";

import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import users from "../services/api/skg/users.api.service";
import { getCookie, setCookie } from "../utils/defaults";
import {
  LoginSuccess,
  LoginUserProps,
  RegisterUserResponse,
  User,
  UserDeleteSuccess,
  UserUpdateSuccess,
} from "../utils/interfaces";

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
  response?: unknown | null;
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

  const registerUser = async (data: User) => {
    try {
      setRegisterUserData({
        isLoading: true,
      });
      const response = await users.RegisterUser(data);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setRegisterUserData({
          isLoading: false,
          response: response.response.data,
        });
      } else {
        setRegisterUserData({
          data: response as RegisterUserResponse,
          isLoading: false,
        });
        if ("token" in response) {
          setCookie("authToken", response.token);
        }
      }
    } catch (err) {
      console.error("Error registering user:", err);
      setRegisterUserData(null);
    }
  };

  const loginUser = async (data: LoginUserProps) => {    try {
      setLoginUserData({
        isLoading: true,
      });
      const response = await users.LoginUser(data);

      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setLoginUserData({
          isLoading: false,
          response: response.response.data,
        });
      } else {
        setLoginUserData({
          data: response as LoginSuccess,
          isLoading: false,
        });
        if ("token" in response) {
          setCookie("authToken", response.token);
          console.log(response.token);
        }
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
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setGetMyselfData({
          isLoading: false,
          response: response.response.data,
        });
      } else {
        setGetMyselfData({
          isLoading: false,
          data: response as User,
        });
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
      });
      const response = await users.UpdateMyself(data);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setUpdateMyselfData({
          isLoading: false,
          response: response.response.data,
        });
      } else {
        setUpdateMyselfData({
          data: response as UserUpdateSuccess,
          isLoading: false,
        });
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
      });
      const response = await users.DeleteMySelf();
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setDeleteMyselfData({
          isLoading: false,
          response: response.response.data,
        });
      } else {
        setDeleteMyselfData({
          data: response as UserDeleteSuccess,
          isLoading: false,
        });
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setDeleteMyselfData(null);
    }
  };

  const getUsers = async () => {
    try {
      setGetUsersData({
        isLoading: true,
      });
      const response = await users.GetUsers();
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setGetUsersData({
          isLoading: false,
          response: response.response.data,
        });
      } else {
        setGetUsersData({
          data: response as User[],
          isLoading: false,
        });
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
      });
      const response = await users.GetUserById(id);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setGetUserByIdData({
          isLoading: false,
          response: response.response.data,
        });
      } else {
        setGetUserByIdData({
          data: response as User,
          isLoading: false,
        });
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
      });
      const response = await users.UpdateUser(id, data);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setUpdateUserData({
          isLoading: false,
          response: response.response.data,
        });
      } else {
        setUpdateUserData({
          data: response as UserUpdateSuccess,
          isLoading: false,
        });
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setUpdateUserData(null);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setDeleteUserData({
        isLoading: true,
      });
      const response = await users.DeleteUser(id);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setDeleteUserData({
          isLoading: false,
          response: response.response.data,
        });
      } else {
        setDeleteUserData({
          data: response as UserDeleteSuccess,
          isLoading: false,
        });
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
