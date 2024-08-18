"use client";

import { isLoggedIn } from "../../../utils/defaults";
import LoggedProfileMenu from "./LoggedProfileMenu";
import NonLoggedProfileMenu from "./NonLoggedProfileMenu";

function ProfileMenu() {
  return isLoggedIn ? <LoggedProfileMenu /> : <NonLoggedProfileMenu />;
}

export default ProfileMenu;
