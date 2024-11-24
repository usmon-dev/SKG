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
  Skeleton,
} from "@mui/joy";
import { Settings, LogoutRounded, Person } from "@mui/icons-material";
import { useUser } from "../../../context/Users";
import { deleteCookie } from "../../../utils/defaults";

function LoggedProfileMenu() {
  const { getMyselfData } = useUser();

  const user = getMyselfData?.data as {
    id: string;
    name: string;
    surname: string;
    username: string;
    password: string;
    isAdmin?: boolean;
  } | null;

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
        {getMyselfData?.isLoading ? (
          <Avatar
            sx={{
              width: "44px",
              height: "44px",
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: "44px",
              height: "44px",
            }}
          >
            {user?.name.slice(0, 1)}
            {user?.surname.slice(0, 1)}
          </Avatar>
        )}
      </MenuButton>
      <Menu
        sx={{
          gap: 1,
        }}
      >
        {getMyselfData?.isLoading ? (
          <ListItem>
            <Skeleton variant="text" />
          </ListItem>
        ) : (
          <ListItem sx={{ margin: "0 auto" }}>
            {user?.name} {user?.surname}
          </ListItem>
        )}
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
        <MenuItem onClick={() => deleteCookie("authToken")} color="danger">
          <ListItemDecorator>
            <LogoutRounded />
          </ListItemDecorator>
          Log out
        </MenuItem>
        {user?.isAdmin && (
          <>
            <Divider />
            <MenuItem>
              <ListItemDecorator>
                <Person />
              </ListItemDecorator>
              Admin
            </MenuItem>
          </>
        )}
      </Menu>
    </Dropdown>
  );
}

export default LoggedProfileMenu;
