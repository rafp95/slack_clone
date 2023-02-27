import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

export const Spinner = () => {
  return (
    <Dimmer active>
      <Loader size="huge" content={"Ładowanie..."} />
    </Dimmer>
  );
};
