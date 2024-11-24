"use client";

import { Typography } from "@mui/joy";
import ProfileMenu from "./profileMenu";
import { redirect } from "../../utils/defaults";

function Navbar() {
  return (
    <div className="navbar">
      <Typography
        onClick={() => redirect("/")}
        level="h1"
        sx={{
          cursor: "pointer",
          color: "#f5f5f5",
        }}
      >
        SKG
      </Typography>
      <ProfileMenu />
    </div>
  );
}

export default Navbar;
