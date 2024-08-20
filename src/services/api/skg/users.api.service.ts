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

const users = {
  RegisterUser: async (props: User) => {
    try {
      const response = await api.post("/users", props);
      return response.data as RegisterUserResponse | RegisterUserAlerts;
    } catch (error) {
      return error as RegisterError;
    }
  },
  LoginUser: async (data: LoginUserProps) => {
    try {
      const response = await api.post("/users/login", data);
      return response.data as LoginSuccess | LoginUserAlerts;
    } catch (error) {
      console.log(error);
      return error as LoginError;
    }
  },
  GetMyself: async () => {
    try {
      const response = await api.get("/users/myself");
      return response.data as User | { message: "User not found" };
    } catch (error) {
      return error as { message: "Error fetching user" };
    }
  },
  UpdateMyself: async (data: User) => {
    try {
      const response = await api.put("/users/myself", data);
      return response.data as { message: "User updated successfully" };
    } catch (error) {
      return error as { message: "Error updating user" };
    }
  },
  DeleteMySelf: async () => {
    try {
      const response = await api.delete("/users/myself");
      return response.data as  { message: "User deleted successfully" };
    } catch (error) {
      return error as { message: "Error deleting user" };
    }
  },
  GetUsers: async () => {
    try {
      const response = await api.get("/users");
      return response.data as User[];
    } catch (error) {
      return error as { message: "Error fetching users" };
    }
  },
  GetUserById: async (id: string) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data as User | { message: "User not found" };
    } catch (error) {
      return error as { message: "Error fetching user" };
    }
  },
  UpdateUser: async (id: string, data: User) => {
    try {
      const response = await api.put(`/users/${id}`, data);
      return response.data as { message: "User updated successfully" };
    } catch (error) {
      return error as { message: "Error updating user" };
    }
  },
  DeleteUser: async (id: string) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data as { message: "User deleted successfully" };
    } catch (error) {
      return error as { message: "Error deleting user" };
    }
  },
};

export default users;
