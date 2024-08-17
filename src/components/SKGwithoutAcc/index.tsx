"use client";

import { Stack, Typography } from "@mui/joy";

function SKGwithoutAcc() {
  return (
    <Stack
    spacing={2}
      sx={{
        width: "100%",
        height: "40vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography level="h1">Secret Key Generator</Typography>
      
    </Stack>
  );
}

export default SKGwithoutAcc;
