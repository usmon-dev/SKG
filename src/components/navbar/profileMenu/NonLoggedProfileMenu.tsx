"use client";

import {
  Avatar,
  Divider,
  Dropdown,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import { LoginRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function NonLoggedProfileMenu() {
  const navigate = useNavigate();
  return (
    <Dropdown>
      <MenuButton
        sx={{
          borderRadius: "50%",
          border: "none",
          width: "44px",
          height: "44px",
          transition: "all 0.2s ease-in-out",
        }}
      >
        <Avatar></Avatar>
      </MenuButton>
      <Menu
        sx={{
          gap: 1,
        }}
      >
        <MenuItem onClick={() => navigate("/login")}>
          <ListItemDecorator>
            <LoginRounded />
          </ListItemDecorator>
          Sign in
        </MenuItem>
        <Divider
          sx={{
            margin: "0px 15px",
          }}
        />
        <MenuItem onClick={() => navigate("/register")}>
          <ListItemDecorator>
            <LoginRounded />
          </ListItemDecorator>
          Sign up
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default NonLoggedProfileMenu;
