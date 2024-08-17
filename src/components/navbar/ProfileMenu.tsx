"use client";

import {
  Avatar,
  Divider,
  Dropdown,
  ListItem,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import { Settings, LogoutRounded } from "@mui/icons-material";

function ProfileMenu() {
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
        <ListItem>Usmon Reyimberganov</ListItem>
        <Divider
          sx={{
            margin: "0px 15px",
          }}
        />

        <MenuItem>
          <ListItemDecorator>
            <Settings />
          </ListItemDecorator>
          Settings
        </MenuItem>
        <MenuItem color="danger">
          <ListItemDecorator>
            <LogoutRounded />
          </ListItemDecorator>
          Log out
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default ProfileMenu;
