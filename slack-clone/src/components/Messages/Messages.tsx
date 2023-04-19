import React, { useState } from "react";
import { Comment, Segment } from "semantic-ui-react";
import { MessageForm } from "./MessageForm";
import { MessagesHeader } from "./MessagesHeader";
import { useApi } from "../../api/useApi";
import { ChannelDto } from "../../models/Channel";
import { store } from "../../actions/reducer";
import { LoggedUser } from "../../models/LoggedUser";

interface MessagesProps {
  loggedUser?: LoggedUser;
}

export const Messages = ({ loggedUser }: MessagesProps) => {
  const [currentChannel, setCurrentChannel] = useState<ChannelDto>();

  store.subscribe(() => {
    const { currentChannel = {} } = store.getState()?.channel;

    setCurrentChannel(currentChannel as ChannelDto);
  });

  const api = useApi("messages");

  return (
    <React.Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages"></Comment.Group>
      </Segment>
      <MessageForm
        messagesRef={api}
        currentChannel={currentChannel}
        LoggedUser={loggedUser}
      />
    </React.Fragment>
  );
};
