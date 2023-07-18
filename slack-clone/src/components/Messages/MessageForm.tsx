import React, { useCallback, useState } from "react";
import { Button, Form, Input, Segment } from "semantic-ui-react";
import { toast } from "react-toastify";
import { ChannelCreated } from "../../models/Channel";
import { LoggedUser } from "../../models/LoggedUser";
import moment from "moment";
import { useApi } from "../../api/useApi";
import { FileModal } from "./FileModal";
import {
  getStorage,
  SessionStorageOperations,
} from "../../utils/session.storage";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { CustomEvents, dispatchEvent } from "../../utilitis/customEvents";

interface MessageFormProps {
  loggedUser?: LoggedUser;
  selectedChannel?: ChannelCreated | null;
}

export const MessageForm = ({
  loggedUser,
  selectedChannel,
}: MessageFormProps) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageIsValid, setMessageIsValid] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [progress, setProgres] = useState<number>(0);
  const [uploadState, setUploadState] = useState<boolean>(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setMessage(value);
  };

  const api = useApi("messages");

  const createMessage = (photoUrl?: string) => {
    return !!photoUrl
      ? {
          timestamp: moment().unix(),
          user: {
            id: loggedUser?.uid,
            name: loggedUser?.displayName,
            avatar: loggedUser?.photoURL,
          },
          photo: photoUrl,
        }
      : {
          timestamp: moment().unix(),
          user: {
            id: loggedUser?.uid,
            name: loggedUser?.displayName,
            avatar: loggedUser?.photoURL,
          },
          content: message,
        };
  };

  function addMessage(message: object) {
    if (!!!selectedChannel) {
      selectedChannel = getStorage<ChannelCreated | null>(
        SessionStorageOperations.CURRENT_CHANNEL
      );
    }

    api
      .createMessage(selectedChannel!.id, message)
      .then(() => {
        setMessage("");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const sendMessage = () => {
    if (message.trim().length == 0) {
      setMessageIsValid(false);
      return;
    }

    setMessageIsValid(true);
    setIsLoading(true);

    addMessage(createMessage());
  };

  const openModal = (): void => {
    setModal(true);
  };

  const closeModal = (): void => {
    setModal(false);
  };

  const addPhotoMessage = useCallback((photoUrl: string) => {
    addMessage(createMessage(photoUrl));
  }, []);

  const uploadFile = (file: File) => {
    setUploadState(true);
    api.sendPhoto(file, addPhotoMessage, setProgres, setUploadState);
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
            onClick={() => {
              dispatchEvent(CustomEvents.new_message, "");
            }}
          />
        </Form>
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
        </Button.Group>
        <FileModal
          modal={modal}
          closeModal={closeModal}
          uploadFile={uploadFile}
        />
        <ProgressBar precentUploaded={progress} uploadState={uploadState} />
      </Segment>
    </>
  );
};
