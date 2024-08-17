import { api } from "../api";

interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  isAdmin?: boolean;
}

interface RegisterUserResponse {
  message: string;
  token: string;
}

interface LoginUserProps {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

const users = {
  RegisterUser: async (props: User) => {
    try {
      const response = await api.post("/users", props);
      return response.data as RegisterUserResponse;
    } catch (error) {
      return console.log(error);
    }
  },
  LoginUser: async (props: LoginUserProps) => {
    try {
      const response = await api.post("/users/login", props);
      return response.data as LoginResponse;
    } catch (error) {
      return console.log(error);
    }
  },
  GetMyself: async () => {
    try {
      const response = await api.get("/users/myself");
      return response.data as User;
    } catch (error) {
      return console.log(error);
    }
  },
  UpdateMyself: async (props: User) => {
    try {
      const response = await api.put("/users/myself", props);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
  DeleteMySelf: async () => {
    try {
      const response = await api.delete("/users/myself");
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
  GetUsers: async () => {
    try {
      const response = await api.get("/users");
      return response.data as User[];
    } catch (error) {
      return console.log(error);
    }
  },
  GetUserById: async (id: string) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data as User;
    } catch (error) {
      return console.log(error);
    }
  },
  UpdateUser: async (id: string, props: User) => {
    try {
      const response = await api.put(`/users/${id}`, props);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
  DeleteUser: async (id: string) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
};

export default users;
