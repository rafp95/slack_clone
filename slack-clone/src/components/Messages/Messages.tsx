import React from "react";
import { Comment, Segment } from "semantic-ui-react";
import { MessageForm } from "./MessageForm";
import { MessagesHeader } from "./MessagesHeader";

export const Messages = () => {
  return (
    <React.Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages"></Comment.Group>
      </Segment>
      <MessageForm />
    </React.Fragment>
  );
};
