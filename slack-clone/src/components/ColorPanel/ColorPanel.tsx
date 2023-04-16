import { Button, Divider, Menu, Sidebar } from "semantic-ui-react";

export const ColorPanel = () => {
  return (
    <>
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
        style={{ width: "64px", maxWidth: "64px" }}
      >
        <Divider />
        <Button
          icon="add"
          size="small"
          color="blue"
          style={{ margin: "0", padding: "10px" }}
        />
      </Sidebar>
      ;
    </>
  );
};
