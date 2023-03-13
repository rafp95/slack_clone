import { Menu } from "semantic-ui-react";
import { UserPanel } from "../UserPanel/UserPanel";

export const SidePanel = () => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#4c3c4c", fontSize: "1.2" }}
    >
      <UserPanel />
    </Menu>
  );
};
