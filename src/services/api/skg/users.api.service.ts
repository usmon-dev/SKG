import { ID } from "../../../utils/interfaces/interfaces";
import {
  GetUserAlert,
  GetUserError,
  GetUsersError,
  LoginError,
  LoginSuccess,
  LoginUserAlerts,
  LoginUserProps,
  RegisterError,
  RegisterUserAlerts,
  RegisterUserResponse,
  User,
  UserDeleteError,
  UserDeleteSuccess,
  UserUpdateError,
  UserUpdateSuccess,
} from "../../../utils/interfaces/Users";
import { api } from "../api";

const users = {
  RegisterUser: async (props: User) => {
    try {
      const response = await api.post("/users/register", props);
      return response.data as RegisterUserResponse;
    } catch (error) {
      return error as RegisterError | RegisterUserAlerts;
    }
  },
  LoginUser: async (props: LoginUserProps) => {
    try {
      const response = await api.post("/users/login", props);
      return response.data as LoginSuccess;
    } catch (error) {
      return error as LoginError | LoginUserAlerts;
    }
  },
  GetMyself: async () => {
    try {
      const response = await api.get("/users/myself");
      return response.data as User;
    } catch (error) {
      return error as GetUserError | GetUserAlert;
    }
  },
  UpdateMyself: async (props: User) => {
    try {
      const response = await api.put("/users/myself", props);
      return response.data as UserUpdateSuccess;
    } catch (error) {
      return error as UserUpdateError;
    }
  },
  DeleteMySelf: async () => {
    try {
      const response = await api.delete("/users/myself");
      return response.data as UserDeleteSuccess;
    } catch (error) {
      return error as UserDeleteError;
    }
  },
  GetUsers: async () => {
    try {
      const response = await api.get("/users");
      return response.data as User[];
    } catch (error) {
      return error as GetUsersError;
    }
  },
  GetUserById: async (id: ID) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data as User;
    } catch (error) {
      return error as GetUserError | GetUserAlert;
    }
  },
  UpdateUser: async (id: ID, props: User) => {
    try {
      const response = await api.put(`/users/${id}`, props);
      return response.data as UserUpdateSuccess;
    } catch (error) {
      return error as UserUpdateError;
    }
  },
  DeleteUser: async (id: ID) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data as UserDeleteSuccess;
    } catch (error) {
      return error as UserDeleteError;
    }
  },
};

export default users;
