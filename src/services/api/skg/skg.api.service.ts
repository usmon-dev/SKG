import { ID } from "../../../utils/interfaces/interfaces";
import {
  CreateSecretKeyProp,
  CreateSecretKeyResponse,
  DeleteSecretKeyResponse,
  GetSecretKeyResponse,
  InternalServerError,
  SecretKeyGeneratorResponse,
  SecretKeyNotFound,
  UnauthorizedAccess,
  UpdateSecretKeyProp,
  UpdateSecretKeyResponse,
} from "../../../utils/interfaces/SKG";
import { api } from "../api";

const skg = {
  SecretKeyGenerator: async () => {
    try {
      const response = await api.post("/skg/generate");
      return response.data as SecretKeyGeneratorResponse;
    } catch (error) {
      return error as InternalServerError;
    }
  },
  CreateSecretKey: async (props: CreateSecretKeyProp) => {
    try {
      const response = await api.post("/skg", props);
      return response.data as CreateSecretKeyResponse;
    } catch (error) {
      return error as InternalServerError;
    }
  },
  GetSecretKeys: async () => {
    try {
      const response = await api.get("/skg");
      return response.data as GetSecretKeyResponse[];
    } catch (error) {
      return error as InternalServerError;
    }
  },
  GetSecretKey: async (params: ID) => {
    try {
      const response = await api.get(`/skg/${params.id}`);
      return response.data as GetSecretKeyResponse;
    } catch (error) {
      return error as
        | InternalServerError
        | SecretKeyNotFound
        | UnauthorizedAccess;
    }
  },
  UpdateSecretKey: async (params: ID, data: UpdateSecretKeyProp) => {
    try {
      const response = await api.put(`/skg/${params.id}`, data);
      return response.data as UpdateSecretKeyResponse;
    } catch (error) {
      return error as
        | InternalServerError
        | SecretKeyNotFound
        | UnauthorizedAccess;
    }
  },
  DeleteSecretKey: async (params: ID) => {
    try {
      const response = await api.delete(`/skg/${params.id}`);
      return response.data as DeleteSecretKeyResponse;
    } catch (error) {
      return error as
        | InternalServerError
        | SecretKeyNotFound
        | UnauthorizedAccess;
    }
  },
};

export default skg;
