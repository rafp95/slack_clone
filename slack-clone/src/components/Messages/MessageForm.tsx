import React, { useState } from "react";
import { Button, Input, Segment } from "semantic-ui-react";
import { FirebaseApi } from "../../api/Firebase.Api";
import { toast } from "react-toastify";
import { ChannelDto } from "../../models/Channel";
import { LoggedUser } from "../../models/LoggedUser";
import { FirebaseUser } from "../../models/FirebaseUser";

interface MessageFormProps {
  messagesRef: FirebaseApi;
  currentChannel?: ChannelDto;
  LoggedUser?: LoggedUser;
}

export const MessageForm = ({
  messagesRef,
  currentChannel,
  LoggedUser,
}: MessageFormProps) => {
  const [message, setMessage] = useState<string>("");
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setMessage(value);
  };

  const sendMessage = () => {
    if (!message.trim().length) {
      toast.error("Wprowadż wiadomość");
    }
  };

  return (
    <>
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          onChange={handleChange}
          placeholder="Napisz wiadomość"
          style={{ marginBottom: ".7em" }}
          label={<Button icon={"add"} />}
        />
        <Button.Group icon widths="2">
          <Button
            onClick={sendMessage}
            color="orange"
            content="Dodaj odpowiedź"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
            content="Dodaj media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    </>
  );
};
