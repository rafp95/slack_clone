import React, { useState } from "react";
import { Button, Form, Input, Segment } from "semantic-ui-react";
import { FirebaseApi } from "../../api/Firebase.Api";
import { toast } from "react-toastify";
import { ChannelDto } from "../../models/Channel";
import { LoggedUser } from "../../models/LoggedUser";
import moment from "moment";
import { useApi } from "../../api/useApi";
import uuid from "react-uuid";
import { store } from "../../actions/reducer";
import { FileModal } from "./FileModal";
interface MessageFormProps {
  loggedUser?: LoggedUser;
}

export const MessageForm = ({ loggedUser }: MessageFormProps) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageIsValid, setMessageIsValid] = useState<boolean>(true);
  const [selectedChannel, setSelectedChannel] = useState<ChannelDto | null>();
  const [modal, setModal] = useState<boolean>(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setMessage(value);
  };

  store.subscribe(() => {
    const { currentChannel = {} } = store.getState()?.channel;
    setSelectedChannel(currentChannel as ChannelDto);
  });

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
      setMessageIsValid(false);
      return;
    }

    setMessageIsValid(true);
    setIsLoading(true);

    api
      .createMessage(selectedChannel!.id, createMessage())
      .then(() => {
        setMessage("");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const openModal = (): void => {
    setModal(true);
  };

  const closeModal = (): void => {
    setModal(false);
  };

  const uploadFile = (file: File, metadata: object) => {
    api.sendPhoto(file);
  };

  return (
    <>
      <Segment className="message__form">
        <Form onSubmit={sendMessage}>
          <Input
            fluid
            name="message"
            className={messageIsValid ? "" : "error input__error"}
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
              disabled={isLoading}
              content="Dodaj odpowiedź"
              labelPosition="left"
              icon="edit"
            />
            <Button
              color="teal"
              content="Dodaj media"
              onClick={openModal}
              labelPosition="right"
              icon="cloud upload"
            />
            <FileModal
              modal={modal}
              closeModal={closeModal}
              uploadFile={uploadFile}
            />
          </Button.Group>
        </Form>
      </Segment>
    </>
  );
};
