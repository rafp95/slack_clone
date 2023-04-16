import React from "react";
import { Button, Input, Segment } from "semantic-ui-react";

export const MessageForm = () => {
  return (
    <>
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          placeholder="Napisz wiadomość"
          style={{ marginBottom: ".7em" }}
          label={<Button icon={"add"} />}
        />
        <Button.Group icon widths="2">
          <Button
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
