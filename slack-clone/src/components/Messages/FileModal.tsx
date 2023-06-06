import { Button, Icon, Image, Input, Modal } from "semantic-ui-react";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

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
  const [preview, setPreview] = useState<string>("");
  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] as File;

    if (!fileHasValidFormat(file)) {
      toast.error(
        `Błędy format pliku, akceptowane formaty to ${validImgType.toString()}`
      );
      return;
    }

    if (file) {
      setPreviewImg(file);
      setFile(file);
    }
  };

  const setPreviewImg = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const clearFile = () => {
    setFile(undefined);
    setPreview("");
  };

  const sendFile = (): void => {
    if (file == null) {
      toast.error("Wybierz plik");
      return;
    }
    if (fileHasValidFormat(file)) {
      const metadata = { contentType: file!.type };
      uploadFile(file as File, metadata);
      closeModal();
      clearFile();
    } else {
      toast.error(
        `Błędy format pliku, akceptowane formaty to ${validImgType.toString()}`
      );
    }
  };

  const fileHasValidFormat = (file: File) => {
    if (file == null) return false;
    const mimeType = file!.type;
    return validImgType.includes(mimeType);
  };

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Wybierz plik</Modal.Header>
      <Modal.Content>
        <Image
          src={preview}
          size="medium"
          centered
          className={`file__img--preview`}
        />
        <Input
          onChange={addFile}
          fluid
          label="Plik: jpg, png"
          name="file"
          type="file"
          className="vertical__center"
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
