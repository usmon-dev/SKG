"use client";

import { createContext, useContext, useState } from "react";
import skg from "../services/api/skg/skg.api.service";

const SKGContext = createContext({});

export const useSKG = () => useContext(SKGContext);

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

const SKGProvider = ({ children }: { children: React.ReactNode }) => {
  const [secretKeyGeneratorData, setSecretKeyGeneratorData] =
    useState<SecretKeyGeneratorResponse | null>(null);
  const [CreateSecretKeyData, setCreateSecretKeyData] = useState<
    CreateSecretKeyResponse | undefined
  >(undefined);

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

  const CreateSecretKey = async (props: CreateSecretKeyProp) => {
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

  return (
    <SKGContext.Provider
      value={{
        secretKeyGeneratorData,
        secretKeyGenerator,
        CreateSecretKeyData,
        CreateSecretKey,
      }}
    >
      {children}
    </SKGContext.Provider>
  );
};
export default SKGProvider;
