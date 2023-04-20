import React, { useEffect, useState } from "react";
import { Comment, Segment } from "semantic-ui-react";
import { MessageForm } from "./MessageForm";
import { MessagesHeader } from "./MessagesHeader";
import { useApi } from "../../api/useApi";
import { ChannelDto } from "../../models/Channel";
import { store } from "../../actions/reducer";
import { LoggedUser } from "../../models/LoggedUser";
import { onValue } from "firebase/database";

interface MessagesProps {
  loggedUser?: LoggedUser;
}

export const Messages = ({ loggedUser }: MessagesProps) => {
  const api = useApi("messages");
  const [currentChannel, setCurrentChannel] = useState<ChannelDto>();
  store.subscribe(() => {
    const { currentChannel = {} } = store.getState()?.channel;
    setCurrentChannel(currentChannel as ChannelDto);
  });

  useEffect(() => {
    onValue(api.messagesRef(), (data) => {
      if (data.val()) {
        console.log(data.val());
      }
    });
  }, []);

  return (
    <React.Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages"></Comment.Group>
      </Segment>
      <MessageForm
        messagesRef={api}
        currentChannel={currentChannel}
        loggedUser={loggedUser}
      />
    </React.Fragment>
  );
};
