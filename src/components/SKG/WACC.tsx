"use client";

import {
  Check,
  ContentCopy,
  Key,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import { useSKG } from "../../context/SKG";
import { useEffect, useState } from "react";
import {
  CreateSecretKeyProp,
  CreateSecretKeyResponse,
  DeleteSecretKeyResponse,
  GetSecretKeyResponse,
  UpdateSecretKeyResponse,
} from "../../utils/interfaces/SKG";
import { copyToClipboard } from "../../utils/defaults";

function CreatedSecretKeyModal(props: { modalOpen: boolean }) {
  const {
    createSecretKeyData,
    deleteSecretKey,
    deleteSecretKeyData,
    updateSecretKey,
    updateSecretKeyData,
  } = useSKG();

  const data = createSecretKeyData?.data as CreateSecretKeyResponse;
  const dskData = deleteSecretKeyData?.data as DeleteSecretKeyResponse;
  const uskData = updateSecretKeyData?.data as UpdateSecretKeyResponse;

  const [cskData, setCskData] = useState<CreateSecretKeyResponse>({
    id: data?.id,
    title: data?.title,
    secretKey: data?.secretKey,
    userId: data?.userId,
  });
  const [open, setOpen] = useState(props.modalOpen);
  const [showSecret, setShowSecret] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    copyToClipboard(cskData.secretKey);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCskData((prevSkgData) => ({
      ...prevSkgData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const disabled =
    deleteSecretKeyData?.isLoading || updateSecretKeyData?.isLoading;

  useEffect(() => {
    if (data) {
      setCskData(data);
    }
    if (dskData?.message == "Secret key deleted successfully" || uskData) {
      handleClose();
    }
    setOpen(props.modalOpen);
  }, [data]);

  return (
    <Modal onClose={handleClose} open={open}>
      <ModalDialog
        sx={{
          width: "600px",
        }}
      >
        <ModalClose onClick={handleClose} />
        <DialogTitle>Created Secret Key</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                onChange={handleInput}
                disabled={disabled}
                placeholder="Enter your Secret Key Name"
                value={cskData.title}
              />
              <FormHelperText>
                You can change this later from editing
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Secret Key</FormLabel>
              <Input
                readOnly
                disabled={disabled}
                placeholder="Your Secret Key"
                value={cskData.secretKey}
                type={showSecret ? "text" : "password"}
                endDecorator={
                  <Stack flexDirection={"row"} spacing={0.1}>
                    <IconButton onClick={() => handleCopyToClipboard()}>
                      {isCopied ? <Check /> : <ContentCopy />}
                    </IconButton>
                    <IconButton onClick={() => setShowSecret(!showSecret)}>
                      {showSecret ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </Stack>
                }
              />
              <FormHelperText>
                You can actually see this secret key later
              </FormHelperText>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Tooltip title="You can't undo this action" placement="bottom">
                <Button
                  disabled={disabled}
                  onClick={() => deleteSecretKey(cskData)}
                  color="danger"
                >
                  Delete
                </Button>
              </Tooltip>
              {cskData == data ? (
                <Button disabled={disabled} onClick={handleClose}>
                  Done
                </Button>
              ) : (
                <Button
                  disabled={disabled}
                  onClick={() =>
                    updateSecretKey({
                      id: createSecretKeyData?.data as CreateSecretKeyResponse,
                      data: cskData,
                    })
                  }
                >
                  Edit
                </Button>
              )}
            </Box>
          </Stack>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

function SKGwithAcc() {
  const {
    getSecretKeys,
    getSecretKeysData,
    createSecretKey,
    createSecretKeyData,
  } = useSKG();

  const [skgData, setSkgData] = useState<CreateSecretKeyProp>({
    title: "",
  });

  const data = getSecretKeysData?.data as GetSecretKeyResponse[];
  const isEmpty = data?.length === 0;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSkgData((prevSkgData) => ({
      ...prevSkgData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getSecretKeys();
  }, []);
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
      <CreatedSecretKeyModal
        modalOpen={createSecretKeyData?.data ? true : false}
      />
      <Typography level="h1">Secret Key Generator</Typography>
      <Input
        name="title"
        onChange={handleInput}
        sx={{
          width: "500px",
          "@media (max-width: 600px)": {
            width: "90%",
          },
        }}
        placeholder="Enter your Secret Key Name"
        endDecorator={
          <Button
            onClick={() => createSecretKey(skgData)}
            disabled={!skgData.title.trim() || createSecretKeyData?.isLoading}
          >
            Generate
          </Button>
        }
        startDecorator={<Key />}
      />
      {isEmpty && <Typography level="body-lg">No Secret Keys Found</Typography>}
      {data?.map((skg) => (
        <Box
          key={skg.id}
          sx={{
            width: "500px",
            "@media (max-width: 600px)": {
              width: "90%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography level="body-lg">{skg.title}</Typography>
            <Typography level="body-lg">{skg.secretKey}</Typography>
          </Box>
          <Divider />
        </Box>
      ))}
    </Stack>
  );
}

export default SKGwithAcc;
