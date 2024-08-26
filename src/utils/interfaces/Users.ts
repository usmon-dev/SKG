export interface User {
  id?: string;
  name: string;
  surname?: string;
  username: string;
  password: string;
  isAdmin?: boolean;
}

export interface RegisterUserResponse {
  message: "User registered successfully";
  token: string;
}

export interface RegisterUserAlerts {
  message: "User already exists";
}

export interface RegisterError {
  message: "Error registering user";
  error: unknown;
}

export interface LoginUserProps {
  username: string;
  password: string;
}

export interface LoginSuccess {
  message: "Login successful";
  token: string;
}

export interface LoginUserAlerts {
  message: "Invalid credentials";
}

export interface LoginError {
  message: "Error logging in";
  error: unknown;
}

export interface GetUsersError {
  message: "Error fetching users";
  error: unknown;
}

export interface GetUserAlert {
  message: "User not found";
}

export interface GetUserError {
  message: "Error fetching user";
  error: unknown;
}

export interface UserUpdateSuccess {
  message: "User updated successfully";
}

export interface UserUpdateError {
  message: "Error updating user";
  error: unknown;
}

export interface UserDeleteSuccess {
  message: "User deleted successfully";
}

export interface UserDeleteError {
  message: "Error deleting user";
  error: unknown;
}
