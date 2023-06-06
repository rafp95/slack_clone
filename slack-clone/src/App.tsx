import "./App.scss";
import React from "react";
import { Grid } from "semantic-ui-react";
import { ColorPanel } from "./components/ColorPanel/ColorPanel";
import { SidePanel } from "./components/SidePanel/SidePanel";
import { MetaPanel } from "./components/MetaPanel/MetaPanel";
import { Messages } from "./components/Messages/Messages";
import { LoggedUser } from "./models/LoggedUser";

interface AppProps {
  loggedUser?: LoggedUser;
}

const App = ({ loggedUser }: AppProps) => {
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel loggedUser={loggedUser} />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages loggedUser={loggedUser} />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

export default App;
