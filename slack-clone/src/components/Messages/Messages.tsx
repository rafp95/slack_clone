import React, { useEffect, useRef, useState } from "react";
import { Comment, Segment } from "semantic-ui-react";
import { MessageForm } from "./MessageForm";
import { MessagesHeader } from "./MessagesHeader";
import { useApi } from "../../api/useApi";
import { ChannelCreated } from "../../models/Channel";
import { LoggedUser } from "../../models/LoggedUser";
import { onValue } from "firebase/database";
import { Message } from "./Message";
import { CustomEvents, dispatchEvent } from "../../utilitis/customEvents";

interface MessagesProps {
  loggedUser?: LoggedUser;
  selectedChannel?: ChannelCreated | null;
}

export const Messages = ({ loggedUser, selectedChannel }: MessagesProps) => {
  const api = useApi(`messages`);
  const [messages, setMessages] = useState<Array<any>>([]);
  const contentRef = useRef<null | HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState<string>("");
  const firstRender = useRef<boolean>(true);

  const scrollToBottom = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedChannel) {
      onValue(api.databaseRef(selectedChannel?.id), (data) => {
        setMessages((prevState) => {
          prevState = Object.values(data.val() ?? []);
          if (!firstRender.current) {
            dispatchEvent(CustomEvents.new_message, selectedChannel!.id);
          } else if (firstRender.current) {
            firstRender.current = false;
          }
          return prevState;
        });
      });
    }
    return () => {
      dispatchEvent(CustomEvents.new_message, "");
      firstRender.current = true;
      setMessages([]);
    };
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
        isLastElem={!firstRender.current ? messages.length - 1 === idx : false}
        setImgLoaded={setImgLoaded}
      />
    ));

  return (
    <React.Fragment>
      <MessagesHeader selectedChannel={selectedChannel} />
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
