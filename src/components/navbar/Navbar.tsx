"use client"

import { Typography } from "@mui/joy"
import ProfileMenu from "./profileMenu"

function Navbar() {
  return (
    <div className="navbar">
        <Typography level="h1" sx={{
          color: "#f5f5f5"
        }}>SKG</Typography>
        <ProfileMenu />
    </div>
  )
}

export default Navbar