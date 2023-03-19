import React, { useState } from "react";
import { Button, Form, Icon, Input, Menu, Modal } from "semantic-ui-react";
import { Channel } from "../../models/Channel";
import * as trace_events from "trace_events";

export const Channels = () => {
  const [channels, setChannels] = useState<Channel>({
    channels: [],
    modal: false,
    channelName: "",
    chanelDetails: "",
  });

  const openModal = () => {
    setChannels((prevState) => {
      prevState.modal = true;
      return { ...prevState };
    });
  };

  const closeModal = () => {
    setChannels((prevState) => {
      prevState.modal = false;
      return { ...prevState };
    });
  };

  const handleChange = (event: any) => {
    setChannels((prevState) => {
      const value = { [event.target.name]: event.target.value };
      prevState.channels.push(value);
      return { ...prevState };
    });
  };

  return (
    <>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item onClick={openModal}>
          <span>
            <Icon name="exchange" /> Kanały{" "}
          </span>
          ({channels.channels.length}) <Icon name="add" />
        </Menu.Item>
        {/*Channels*/}
      </Menu.Menu>

      {/*Add channel*/}
      <Modal basic open={channels.modal} onClose={closeModal}>
        <Modal.Header>Dodaj kanał</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input fluid label="Nazwa kanału" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="Detale kanału"
                name="channelDetails"
                onChange={handleChange}
              />
            </Form.Field>
            <Modal.Actions>
              <Button color="green" inverted onClick={openModal}>
                <Icon name="checkmark" />
                Dodaj
              </Button>
              <Button color="red" inverted onClick={closeModal}>
                <Icon name="remove" />
                Zamknij
              </Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};
