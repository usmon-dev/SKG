"use client";

import React, { createContext, useContext, useState } from "react";
import skg from "../services/api/skg/skg.api.service";

interface SecretKeyGeneratorResponse {
  secretKey: string;
}
interface CreateSecretKeyProp {
  title: string;
}
interface CreateSecretKeyResponse {
  id: string;
  title: string;
  secretKey: string;
  userId: string;
}
interface GetSecretKeyResponse {
  id: string;
  title: string;
  secretKey: string;
  userId: string;
}
interface UpdateSecretKeyProp {
  title: string;
}
interface UpdateSecretKeyResponse {
  id: string;
  title: string;
  secretKey: string;
  userId: string;
}

interface ResponseType {
  isLoading: boolean;
  data:
    | SecretKeyGeneratorResponse
    | CreateSecretKeyResponse
    | GetSecretKeyResponse
    | GetSecretKeyResponse[]
    | UpdateSecretKeyResponse
    | { message: string }
    | null
    | [];
}

const SKGContext = createContext({
  secretKeyGeneratorData: null as ResponseType | null,
  createSecretKeyData: undefined as ResponseType | undefined,
  getSecretKeysData: null as ResponseType | null,
  getSecretKeyData: null as ResponseType | null,
  updateSecretKeyData: null as ResponseType | null,
  deleteSecretKeyData: null as ResponseType | null,
  secretKeyGenerator: async () => {},
  createSecretKey: async (prop: CreateSecretKeyProp) => {},
  getSecretKeys: async () => {},
  getSecretKey: async (props: { id: string }) => {},
  updateSecretKey: async (props: {
    id: string;
    data: UpdateSecretKeyProp;
  }) => {},
  deleteSecretKey: async (id: { id: string }) => {},
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

  const getSecretKey = async (props: { id: string }) => {
    try {
      setGetSecretKeyData({
        isLoading: true,
        data: null,
      });
      const response = await skg.GetSecretKey(props.id);
      if (response) {
        setGetSecretKeyData({
          data: response as GetSecretKeyResponse,
          isLoading: false,
        });
      } else {
        throw new Error("Invalid response from GetSecretKey");
      }
    } catch (err) {
      console.error("Error generating secret key:", err);
      setGetSecretKeyData(null);
    }
  };
  const updateSecretKey = async (props: {
    id: string;
    data: UpdateSecretKeyProp;
  }) => {
    try {
      setUpdateSecretKeyData({
        isLoading: true,
        data: null,
      });
      const response = await skg.UpdateSecretKey(props.id, props.data);
      if (response) {
        setUpdateSecretKeyData({
          data: response as UpdateSecretKeyResponse,
          isLoading: false,
        });
      } else {
        throw new Error("Invalid response from UpdateSecretKey");
      }
    } catch (err) {
      console.error("Error generating secret key:", err);
      setUpdateSecretKeyData(null);
    }
  };
  const deleteSecretKey = async (props: { id: string }) => {
    try {
      setDeleteSecretKeyData({
        isLoading: true,
        data: null,
      });
      const response = await skg.DeleteSecretKey(props.id);
      if (response) {
        setDeleteSecretKeyData({
          data: response as { message: string },
          isLoading: false,
        });
      } else {
        throw new Error("Invalid response from DeleteSecretKey");
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
