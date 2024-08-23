export interface SecretKeyGeneratorResponse {
  secretKey: string;
}

export interface CreateSecretKeyProp {
  title: string;
}
export interface CreateSecretKeyResponse {
  id: string;
  title: string;
  secretKey: string;
  userId: string;
}

export interface GetSecretKeyResponse {
  id: string;
  title: string;
  secretKey: string;
  userId: string;
}

export interface UpdateSecretKeyProp {
  title: string;
}

export interface UpdateSecretKeyResponse {
  id: string;
  title: string;
  secretKey: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
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

export interface UserUpdateSuccess {
  message: "User updated successfully";
}

export interface UserDeleteSuccess {
  message: "User deleted successfully";
}