import "./App.scss";
import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { ColorPanel } from "./components/ColorPanel/ColorPanel";
import { SidePanel } from "./components/SidePanel/SidePanel";
import { MetaPanel } from "./components/MetaPanel/MetaPanel";
import { Messages } from "./components/Messages/Messages";
import { store } from "./actions/reducer";
import { ChannelDto } from "./models/Channel";
import { FirebaseUser } from "./models/FirebaseUser";
import { initialUserState } from "./reducers";
import { useStore } from "react-redux";

const App = () => {
  const [loggedUser, setLoggedUser] = useState<FirebaseUser>(initialUserState);

  store.subscribe(() => {
    const user: FirebaseUser = store.getState()?.user;
    if (user && user.currentUser) {
      setLoggedUser(user as FirebaseUser);
    }
  });

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
