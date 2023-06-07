import "./App.scss";
import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { ColorPanel } from "./components/ColorPanel/ColorPanel";
import { SidePanel } from "./components/SidePanel/SidePanel";
import { MetaPanel } from "./components/MetaPanel/MetaPanel";
import { Messages } from "./components/Messages/Messages";
import { LoggedUser } from "./models/LoggedUser";
import { ChannelDto } from "./models/Channel";
import { store } from "./actions/reducer";
import { SessionStorageOperations, setStorage } from "./utils/session.storage";

interface AppProps {
  loggedUser?: LoggedUser;
}

const App = ({ loggedUser }: AppProps) => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelDto>();

  store.subscribe(() => {
    const { currentChannel = null } = store.getState()?.channel;
    if (currentChannel) {
      setSelectedChannel(currentChannel as ChannelDto);
      setStorage(
        SessionStorageOperations.CURRENT_CHANNEL,
        currentChannel as ChannelDto
      );
    }
  });

  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel loggedUser={loggedUser} />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages loggedUser={loggedUser} selectedChannel={selectedChannel} />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

export default App;
