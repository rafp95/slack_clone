import React, { useEffect, useState } from "react";
import { Button, Form, Icon, Input, Menu, Modal } from "semantic-ui-react";
import { ChanelDto, Channel, ChannelDetails } from "../../models/Channel";
import { getPropName } from "../../utilitis/propName";
import { toast } from "react-toastify";
import { FirebaseUser } from "../../models/FirebaseUser";
import uuid from "react-uuid";
import { child, getDatabase, ref, set, get } from "firebase/database";

const channelDetailsDefault = {
  channelDetails: "",
  channelName: "",
} as ChannelDetails;

export interface ChannelsProps {
  loggedUser: FirebaseUser;
}

const db = getDatabase();
const keyName = "channels";

export const Channels = ({ loggedUser }: ChannelsProps) => {
  const [channelDetails, setChannelDetails] = useState<ChannelDetails>(
    channelDetailsDefault
  );
  const [loadedChannels, setLoadedChannels] = useState<ChanelDto[]>([]);
  const [channels, setChannels] = useState<Channel>({
    channels: [],
    modal: false,
    channelName: "",
    chanelDetails: "",
  });
  const [refreshList, setRefreshList] = useState<boolean>(false);

  useEffect(() => {
    const channelsRef = ref(db, keyName).ref;
    get(channelsRef).then((data) => {
      console.log(data.val());
      setLoadedChannels(Object.values(data.val()));
    });
  }, [refreshList]);

  const addChannel = () => {
    const channelsRef = ref(db, keyName).ref;

    const key = uuid();

    const newChannel = {
      id: key,
      name: channelDetails.channelName,
      details: channelDetails.channelDetails,
      createdBy: {
        name: loggedUser.currentUser?.displayName,
        avatar: loggedUser.currentUser?.photoURL,
      },
    };

    set(child(channelsRef, key ?? ""), {
      ...newChannel,
    })
      .then(() => {
        setLoadedChannels((prevState) => {
          prevState = [];
          return prevState;
        });
        setRefreshList((prevState) => !prevState);
        setChannelDetails((prevState) => {
          prevState = channelDetailsDefault;
          return prevState;
        });
        toast.success("Dodano pomyślnie");
        closeModal();
      })
      .catch((err) => {
        toast.success("Wystąpił błąd");
      });
  };

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
    event.preventDefault();
    setChannelDetails((prevState) => {
      prevState = { ...prevState, [event.target.name]: event.target.value };
      return { ...prevState };
    });
  };

  const formValid = () => {
    return Object.values(channelDetails).every((_) => _.length > 0);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formValid()) {
      setChannels((prevState) => {
        prevState.channels.push(channelDetails);
        return { ...prevState };
      });
      addChannel();
    } else {
      toast.error("Uzupełnij poprawnie wszystkie pola");
    }
  };

  return (
    <>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item onClick={openModal}>
          <span>
            <Icon name="exchange" /> Kanały{" "}
          </span>
          ({loadedChannels.length}) <Icon name="add" />
        </Menu.Item>
        {/*Channels*/}
        {loadedChannels.length > 0 &&
          loadedChannels.map((channel: ChanelDto) => {
            return (
              <Menu.Item
                key={channel.id}
                name={channel.name}
                style={{ opacity: 0.7 }}
                onClick={() => console.log(channel)}
              >
                # {channel.name}
              </Menu.Item>
            );
          })}
      </Menu.Menu>

      {/*Add channel*/}
      <Modal basic open={channels.modal} onClose={closeModal}>
        <Modal.Header>Dodaj kanał</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                fluid
                label="Nazwa kanału"
                name={getPropName<ChannelDetails>("channelName")}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="Detale kanału"
                name={getPropName<ChannelDetails>("channelDetails")}
                onChange={handleChange}
              />
            </Form.Field>
            <Modal.Actions>
              <Button color="green" inverted onClick={handleSubmit}>
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
