export interface InternalServerError {
  error: "Internal Server Error";
}

export interface UnauthorizedAccess {
  error: "Unauthorized Access";
}

export interface SecretKeyNotFound {
  error: "Secret key not found";
}

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

export interface DeleteSecretKeyResponse {
  message: "Secret key deleted successfully";
}
