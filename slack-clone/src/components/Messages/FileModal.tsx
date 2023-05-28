import { Button, Icon, Input, Modal } from "semantic-ui-react";
import { useState } from "react";
import * as React from "react";
import mime from "mime-types";

interface FileModalProps {
  closeModal(): void;
  modal: boolean;
  uploadFile(file: File, metadata: object): void;
}

const validImgType: string[] = ["image/jpeg", "image/png"];

export const FileModal = ({
  modal,
  closeModal,
  uploadFile,
}: FileModalProps) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] as File;
    if (file) {
      setFile(file);
    }
  };

  const clearFile = () => {
    setFile(undefined);
  };

  const sendFile = (): void => {
    if (file == null) return;

    const mimeType = file!.type;
    if (validImgType.includes(mimeType)) {
      const metadata = { contentType: file!.type };
      uploadFile(file as File, metadata);
      closeModal();
      clearFile();
    }
  };

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Wybierz plik</Modal.Header>
      <Modal.Content>
        <Input
          onChange={addFile}
          fluid
          label="Plik: jpg, png"
          name="file"
          type="file"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={sendFile}>
          <Icon name="checkmark" />
          Wyślij
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="checkmark" />
          Zamknij
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
