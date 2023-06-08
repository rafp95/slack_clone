import React, { useEffect, useRef, useState } from "react";
import { Comment, Segment } from "semantic-ui-react";
import { MessageForm } from "./MessageForm";
import { MessagesHeader } from "./MessagesHeader";
import { useApi } from "../../api/useApi";
import { ChannelDto } from "../../models/Channel";
import { LoggedUser } from "../../models/LoggedUser";
import { onValue } from "firebase/database";
import { Message } from "./Message";

interface MessagesProps {
  loggedUser?: LoggedUser;
  selectedChannel?: ChannelDto | null;
}

export const Messages = ({ loggedUser, selectedChannel }: MessagesProps) => {
  const api = useApi(`messages`);
  const [messages, setMessages] = useState<Array<any>>([]);
  const contentRef = useRef<null | HTMLDivElement>(null);
  const [isInitLoaded, setIsInitLoaded] = useState<boolean>(true);
  const [imgLoaded, setImgLoaded] = useState<string>("");
  const scrollToBottom = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedChannel) {
      onValue(api.databaseRef(selectedChannel?.id), (data) => {
        setMessages((prevState) => {
          if (prevState.length !== 0) {
            setIsInitLoaded(false);
          }
          prevState = Object.values(data.val() ?? []);
          return prevState;
        });
      });
    }
  }, [selectedChannel]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, imgLoaded]);

  const displayMessages = (messages: Array<object>) =>
    messages.map((_, idx) => (
      <Message
        key={idx}
        message={_}
        user={loggedUser}
        isLastElem={!isInitLoaded ?? messages.length - 1 === idx}
        setImgLoaded={setImgLoaded}
      />
    ));

  return (
    <React.Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages">
          {displayMessages(messages)}
          {!!messages.length && <div ref={contentRef} />}
        </Comment.Group>
      </Segment>
      <MessageForm loggedUser={loggedUser} selectedChannel={selectedChannel} />
    </React.Fragment>
  );
};
