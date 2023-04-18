import { Menu } from "semantic-ui-react";
import { UserPanel } from "../UserPanel/UserPanel";
import React, { useEffect, useState } from "react";
import { Channels } from "./Chanels";
import { FirebaseUser } from "../../models/FirebaseUser";
import { initialUserState } from "../../reducers";
import { useStore } from "react-redux";

interface SidePanelProps {
  loggedUser: FirebaseUser;
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
