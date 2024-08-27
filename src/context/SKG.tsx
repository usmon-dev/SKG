"use client";

import React, { createContext, useContext, useState } from "react";
import skg from "../services/api/skg/skg.api.service";
import {
  CreateSecretKeyProp,
  CreateSecretKeyResponse,
  DeleteSecretKeyResponse,
  GetSecretKeyResponse,
  SecretKeyGeneratorResponse,
  SecretKeyNotFound,
  UnauthorizedAccess,
  UpdateSecretKeyProp,
  UpdateSecretKeyResponse,
} from "../utils/interfaces/SKG";
import { ID } from "../utils/interfaces/interfaces";

interface ResponseType {
  isLoading: boolean;
  data?:
    | SecretKeyGeneratorResponse
    | CreateSecretKeyResponse
    | GetSecretKeyResponse
    | GetSecretKeyResponse[]
    | UpdateSecretKeyResponse
    | DeleteSecretKeyResponse
    | null;
  response?: SecretKeyNotFound | UnauthorizedAccess;
}

const SKGContext = createContext({
  secretKeyGeneratorData: null as ResponseType | null,
  createSecretKeyData: undefined as ResponseType | undefined,
  getSecretKeysData: null as ResponseType | null,
  getSecretKeyData: null as ResponseType | null,
  updateSecretKeyData: null as ResponseType | null,
  deleteSecretKeyData: null as ResponseType | null,
  secretKeyGenerator: async () => {},
  createSecretKey: async (prop: CreateSecretKeyProp) => {
    prop;
  },
  getSecretKeys: async () => {},
  getSecretKey: async (props: ID) => {
    props;
  },
  updateSecretKey: async (props: { id: ID; data: UpdateSecretKeyProp }) => {
    props;
  },
  deleteSecretKey: async (id: ID) => {
    id;
  },
});

export const useSKG = () => useContext(SKGContext);

const SKGProvider = ({ children }: { children: React.ReactNode }) => {
  const [secretKeyGeneratorData, setSecretKeyGeneratorData] =
    useState<ResponseType | null>(null);
  const [createSecretKeyData, setCreateSecretKeyData] = useState<
    ResponseType | undefined
  >(undefined);
  const [getSecretKeysData, setGetSecretKeysData] =
    useState<ResponseType | null>(null);
  const [getSecretKeyData, setGetSecretKeyData] = useState<ResponseType | null>(
    null
  );
  const [updateSecretKeyData, setUpdateSecretKeyData] =
    useState<ResponseType | null>(null);
  const [deleteSecretKeyData, setDeleteSecretKeyData] =
    useState<ResponseType | null>(null);

  const secretKeyGenerator = async () => {
    try {
      setSecretKeyGeneratorData({
        isLoading: true,
        data: null,
      });
      const response = await skg.SecretKeyGenerator();
      if (response) {
        setSecretKeyGeneratorData({
          data: response as SecretKeyGeneratorResponse,
          isLoading: false,
        });
      } else {
        throw new Error("Invalid response from SecretKeyGenerator");
      }
    } catch (error) {
      console.error("Error generating secret key:", error);
      setSecretKeyGeneratorData(null);
    }
  };
  const createSecretKey = async (props: CreateSecretKeyProp) => {
    try {
      setCreateSecretKeyData({
        isLoading: true,
        data: null,
      });
      const response = await skg.CreateSecretKey(props);
      if (response) {
        setCreateSecretKeyData({
          data: response as CreateSecretKeyResponse,
          isLoading: false,
        });
      } else {
        throw new Error("Invalid response from CreateSecretKey");
      }
    } catch (err) {
      console.error("Error generating secret key:", err);
      setCreateSecretKeyData(undefined);
    }
  };

  const getSecretKeys = async () => {
    try {
      setGetSecretKeysData({
        isLoading: true,
        data: [],
      });
      const response = await skg.GetSecretKeys();
      if (response) {
        setGetSecretKeysData({
          data: response as GetSecretKeyResponse[],
          isLoading: false,
        });
      } else {
        throw new Error("Invalid response from GetSecretKeys");
      }
    } catch (err) {
      console.error("Error generating secret key:", err);
      setGetSecretKeysData(null);
    }
  };

  const getSecretKey = async (props: ID) => {
    try {
      setGetSecretKeyData({
        isLoading: true,
        data: null,
      });
      const response = await skg.GetSecretKey(props);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setGetSecretKeyData({
          response: response.response.data as
            | SecretKeyNotFound
            | UnauthorizedAccess,
          isLoading: false,
        });
      } else {
        setGetSecretKeyData({
          data: response as GetSecretKeyResponse,
          isLoading: false,
        });
      }
    } catch (err) {
      console.error("Error generating secret key:", err);
      setGetSecretKeyData(null);
    }
  };
  const updateSecretKey = async (props: {
    id: ID;
    data: UpdateSecretKeyProp;
  }) => {
    try {
      setUpdateSecretKeyData({
        isLoading: true,
        data: null,
      });
      const response = await skg.UpdateSecretKey(props.id, props.data);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setUpdateSecretKeyData({
          response: response.response.data as
            | SecretKeyNotFound
            | UnauthorizedAccess,
          isLoading: false,
        });
      } else {
        setUpdateSecretKeyData({
          data: response as UpdateSecretKeyResponse,
          isLoading: false,
        });
      }
    } catch (err) {
      console.error("Error generating secret key:", err);
      setUpdateSecretKeyData(null);
    }
  };
  const deleteSecretKey = async (props: ID) => {
    try {
      setDeleteSecretKeyData({
        isLoading: true,
        data: null,
      });
      const response = await skg.DeleteSecretKey(props);
      if (
        response &&
        "response" in response &&
        typeof response.response === "object" &&
        response.response !== null &&
        "data" in response.response
      ) {
        setDeleteSecretKeyData({
          response: response.response.data as
            | SecretKeyNotFound
            | UnauthorizedAccess,
          isLoading: false,
        });
      } else {
        setDeleteSecretKeyData({
          data: response as DeleteSecretKeyResponse,
          isLoading: false,
        });
      }
    } catch (err) {
      console.error("Error generating secret key:", err);
      setDeleteSecretKeyData(null);
    }
  };
  return (
    <SKGContext.Provider
      value={{
        secretKeyGeneratorData,
        secretKeyGenerator,
        createSecretKeyData,
        createSecretKey,
        getSecretKeysData,
        getSecretKeys,
        deleteSecretKey,
        deleteSecretKeyData,
        getSecretKey,
        getSecretKeyData,
        updateSecretKey,
        updateSecretKeyData,
      }}
    >
      {children}
    </SKGContext.Provider>
  );
};
export default SKGProvider;
