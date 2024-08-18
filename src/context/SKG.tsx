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

const SKGContext = createContext({
  secretKeyGeneratorData: null as SecretKeyGeneratorResponse | null,
  createSecretKeyData: undefined as CreateSecretKeyResponse | undefined,
  getSecretKeysData: [] as GetSecretKeyResponse[],
  getSecretKeyData: null as GetSecretKeyResponse | null,
  updateSecretKeyData: null as UpdateSecretKeyResponse | null,
  deleteSecretKeyData: null as { message: string } | null,
  secretKeyGenerator: async () => {},
  createSecretKey: async (prop: CreateSecretKeyProp) => {},
  getSecretKeys: async () => {},
  getSecretKey: async (props: {id: string}) => {},
  updateSecretKey: async (props: { id: string; data: UpdateSecretKeyProp; }) => {},
  deleteSecretKey: async (id: {id: string}) => {},
});

export const useSKG = () => useContext(SKGContext);

const SKGProvider = ({ children }: { children: React.ReactNode }) => {
  const [secretKeyGeneratorData, setSecretKeyGeneratorData] =
    useState<SecretKeyGeneratorResponse | null>(null);
  const [createSecretKeyData, setCreateSecretKeyData] = useState<
    CreateSecretKeyResponse | undefined
  >(undefined);
  const [getSecretKeysData, setGetSecretKeysData] = useState<
    GetSecretKeyResponse[] | []
  >([]);
  const [getSecretKeyData, setGetSecretKeyData] =
    useState<GetSecretKeyResponse | null>(null);
  const [updateSecretKeyData, setUpdateSecretKeyData] =
    useState<UpdateSecretKeyResponse | null>(null);
  const [deleteSecretKeyData, setDeleteSecretKeyData] = useState<{
    message: string;
  } | null>(null);
  const secretKeyGenerator = async () => {
    try {
      const response = await skg.SecretKeyGenerator();
      if (response) {
        setSecretKeyGeneratorData(response as SecretKeyGeneratorResponse);
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
      const response = await skg.CreateSecretKey(props);
      if (response) {
        setCreateSecretKeyData(response as CreateSecretKeyResponse);
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
      const response = await skg.GetSecretKeys();
      if (response) {
        setGetSecretKeysData(response as GetSecretKeyResponse[]);
      } else {
        throw new Error("Invalid response from GetSecretKeys");
      }
    } catch (err) {
      console.error("Error generating secret key:", err);
      setGetSecretKeysData([]);
    }
  };

  const getSecretKey = async (props: { id: string }) => {
    try {
      const response = await skg.GetSecretKey(props.id);
      if (response) {
        setGetSecretKeyData(response as GetSecretKeyResponse);
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
      const response = await skg.UpdateSecretKey(props.id, props.data);
      if (response) {
        setUpdateSecretKeyData(response as UpdateSecretKeyResponse);
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
      const response = await skg.DeleteSecretKey(props.id);
      if (response) {
        setDeleteSecretKeyData(response as { message: string });
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
