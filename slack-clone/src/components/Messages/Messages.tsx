import React, { useEffect, useRef, useState } from "react";
import { Comment, Loader, Segment } from "semantic-ui-react";
import { MessageForm } from "./MessageForm";
import { MessagesHeader } from "./MessagesHeader";
import { useApi } from "../../api/useApi";
import { ChannelDto } from "../../models/Channel";
import { store } from "../../actions/reducer";
import { LoggedUser } from "../../models/LoggedUser";
import { onValue } from "firebase/database";
import { Message } from "./Message";

interface MessagesProps {
  loggedUser?: LoggedUser;
}

export const Messages = ({ loggedUser }: MessagesProps) => {
  const api = useApi("messages");
  const [currentChannel, setCurrentChannel] = useState<ChannelDto>();
  const [messages, setMessages] = useState<Array<any>>([]);
  const contentRef = useRef<null | HTMLDivElement>(null);
  const [isInitLoaded, setIsInitLoaded] = useState<boolean>(true);

  store.subscribe(() => {
    const { currentChannel = {} } = store.getState()?.channel;
    setCurrentChannel(currentChannel as ChannelDto);
  });

  const scrollToBottom = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    onValue(api.databaseRef(), (data) => {
      setMessages((prevState) => {
        if (prevState.length !== 0) {
          setIsInitLoaded(false);
        }
        prevState = Object.values(data.val() ?? []);
        return prevState;
      });
    });
  }, []);

  const displayMessages = (messages: Array<object>) =>
    messages.map((_, idx) => (
      <Message
        message={_}
        user={loggedUser}
        isLastElem={!isInitLoaded ?? messages.length - 1 === idx ? true : false}
      />
    ));

  return (
    <React.Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages">
          {displayMessages(messages)}
          <div ref={contentRef} />
        </Comment.Group>
      </Segment>
      <MessageForm
        messagesRef={api}
        currentChannel={currentChannel}
        loggedUser={loggedUser}
      />
    </React.Fragment>
  );
};
