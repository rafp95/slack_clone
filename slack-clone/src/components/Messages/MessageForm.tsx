import React, { useState } from "react";
import { Button, Input, Segment } from "semantic-ui-react";
import { FirebaseApi } from "../../api/Firebase.Api";
import { toast } from "react-toastify";
import { ChannelDto } from "../../models/Channel";
import { LoggedUser } from "../../models/LoggedUser";
import moment from "moment";
import { useApi } from "../../api/useApi";
import uuid from "react-uuid";
interface MessageFormProps {
  messagesRef: FirebaseApi;
  currentChannel?: ChannelDto;
  loggedUser?: LoggedUser;
}

export const MessageForm = ({
  messagesRef,
  currentChannel,
  loggedUser,
}: MessageFormProps) => {
  const [message, setMessage] = useState<string>("");
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setMessage(value);
  };

  const api = useApi("messages");

  const createMessage = () => {
    return {
      timestamp: moment().unix(),
      user: {
        id: loggedUser?.uid,
        name: loggedUser?.displayName,
        avatar: loggedUser?.photoURL,
      },
      content: message,
    };
  };

  const sendMessage = () => {
    if (message.trim().length == 0) {
      toast.error("Wprowadż wiadomość");
      return;
    }

    api
      .createMessage(uuid(), createMessage())
      .then(() => {
        setMessage("");
        toast.success("Dodano wiadomość");
      })
      .catch((err) => {
        toast.error(err);
      });
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
          value={message}
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
