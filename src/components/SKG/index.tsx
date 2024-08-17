"use client";

import { Button, Input, Link, Stack, Typography } from "@mui/joy";
import { Key } from "@mui/icons-material";

function SKG() {
  return (
    <Stack
      spacing={5}
      sx={{
        width: "90%",
        height: "60vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: "0 auto"
      }}
    >
      <Typography level="h1">Secret Key Generator</Typography>
      <Input
        readOnly
        startDecorator={<Key />}
        endDecorator={<Button>Generate</Button>}
        sx={{
          width: "500px",

          "@media (max-width: 600px)": {
            width: "90%",
          }
        }}
        placeholder="Tap Generate to generate a secret key"
      />
      <Typography>
        Do you want to save your secret key? <Link>Sign in</Link> or <Link>Sign up</Link>
      </Typography>
    </Stack>
  );
}

export default SKG;
