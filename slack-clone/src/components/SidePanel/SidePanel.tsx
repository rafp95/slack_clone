import { Menu } from "semantic-ui-react";
import { UserPanel } from "../UserPanel/UserPanel";
import React from "react";
import { Channels } from "./Chanels";
import { LoggedUser } from "../../models/LoggedUser";

interface SidePanelProps {
  loggedUser?: LoggedUser;
}

export const SidePanel = ({ loggedUser }: SidePanelProps) => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#4c3c4c", fontSize: "1.2" }}
    >
      <UserPanel loggedUser={loggedUser} />
      <Channels loggedUser={loggedUser} />
    </Menu>
  );
};
