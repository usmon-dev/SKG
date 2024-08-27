"use client";

import { Button, IconButton, Input, Link, Stack, Typography } from "@mui/joy";
import {
  Key,
  Loop,
  Visibility,
  VisibilityOff,
  ContentCopy,
  Check,
} from "@mui/icons-material";
import { useSKG } from "../../context/SKG";
import { useState } from "react";
import { copyToClipboard } from "../../utils/defaults";
import { SecretKeyGeneratorResponse } from "../../utils/interfaces/SKG";

function SKGwithoutAcc() {
  const { secretKeyGenerator, secretKeyGeneratorData } = useSKG();
  const [secretKey, setSecretKey] = useState<SecretKeyGeneratorResponse>({
    secretKey: "",
  });
  const [isCopied, setIsCopied] = useState(false);
  const [showSecret, setShowSecret] = useState<boolean>(true);

  const handleSecretKeyGenerator = async () => {
    try {
      await secretKeyGenerator();
      const data = secretKeyGeneratorData?.data;
      if (data && "secretKey" in data) {
        setSecretKey(data as SecretKeyGeneratorResponse);
        setIsCopied(false);
      } else {
        setSecretKey({ secretKey: "" });
      }
    } catch (error) {
      console.error("Error generating secret key:", error);
    }
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(secretKey.secretKey);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Stack
      spacing={7}
      sx={{
        width: "90%",
        height: "60vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      <Typography level="h1">Secret Key Generator</Typography>
      <Input
        type={showSecret ? "text" : "password"}
        readOnly
        startDecorator={<Key />}
        value={secretKey.secretKey || ""}
        endDecorator={
          !secretKey?.secretKey ? (
            <Button
              onClick={handleSecretKeyGenerator}
              disabled={secretKeyGeneratorData?.isLoading}
            >
              {secretKeyGeneratorData?.isLoading ? "Loading..." : "Generate"}
            </Button>
          ) : (
            <Stack spacing={0.1} direction="row">
              <IconButton onClick={() => handleCopyToClipboard()}>
                {isCopied ? <Check /> : <ContentCopy />}
              </IconButton>
              <IconButton onClick={() => setShowSecret(!showSecret)}>
                {!showSecret ? <Visibility /> : <VisibilityOff />}
              </IconButton>
              <IconButton
                onClick={handleSecretKeyGenerator}
                disabled={secretKeyGeneratorData?.isLoading}
              >
                <Loop />
              </IconButton>
            </Stack>
          )
        }
        sx={{
          width: "500px",
          "@media (max-width: 600px)": {
            width: "90%",
          },
        }}
        placeholder="Tap Generate to generate a secret key"
      />
      <Typography>
        Do you want to save your secret key? <Link href="/login">Sign in</Link>{" "}
        or <Link href="/register">Sign up</Link>
      </Typography>
    </Stack>
  );
}

export default SKGwithoutAcc;
