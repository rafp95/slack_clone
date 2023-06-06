import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Icon,
  Input,
  Loader,
  Menu,
  Modal,
} from "semantic-ui-react";
import { Channel, ChannelDetails, ChannelDto } from "../../models/Channel";
import { getPropName } from "../../utilitis/propName";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import { useApi } from "../../api/useApi";
import { onValue } from "firebase/database";
import { store } from "../../actions/reducer";
import { LoggedUser } from "../../models/LoggedUser";
import { setChannel } from "../../actions";
import channelsStyle from "./channels.module.scss";

const channelDetailsDefault = {
  channelDetails: "",
  channelName: "",
} as ChannelDetails;

export interface ChannelsProps {
  loggedUser?: LoggedUser;
}

export const Channels = ({ loggedUser }: ChannelsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChannelLoading, setIsChannelLoading] = useState<boolean>(true);

  const [channelDetails, setChannelDetails] = useState<ChannelDetails>(
    channelDetailsDefault
  );
  const [loadedChannels, setLoadedChannels] = useState<ChannelDto[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<ChannelDto | null>();

  const [channels, setChannels] = useState<Channel>({
    channels: [],
    modal: false,
    channelName: "",
    chanelDetails: "",
  });
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const api = useApi("channels");

  store.subscribe(() => {
    const { currentChannel = {} } = store.getState()?.channel;
    setSelectedChannel(currentChannel as ChannelDto);
  });

  useEffect(() => {
    onValue(api.databaseRef(), (data) => {
      const resultData = Object.values(data.val());
      setLoadedChannels(resultData as ChannelDto[]);

      if (resultData?.length) {
        if (!selectedChannel?.id) {
          setSelectedChannel(resultData[0] as ChannelDto);
          setChannel(resultData[0] as ChannelDto);
        }
      } else {
        setLoadedChannels([]);
        setSelectedChannel(null);
      }
      setIsChannelLoading(false);
    });
  }, [refreshList]);

  const addChannel = () => {
    const key = uuid();
    const newChannel = {
      id: key,
      name: channelDetails.channelName,
      details: channelDetails.channelDetails,
      createdBy: {
        name: loggedUser?.displayName,
        avatar: loggedUser?.photoURL,
      },
    };

    setIsLoading(true);

    api
      .addChannels(key, newChannel)
      .then((data) => {
        console.log(data);
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
      })
      .finally(() => {
        setIsLoading(false);
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

  const handleChannel = (channel: any) => {
    const { id = 0 } = channel;
    if (selectedChannel && id && id === selectedChannel?.id) {
      return;
    }

    setChannel(channel);
    setSelectedChannel(channel as ChannelDto);

    let text = "";
    if (selectedChannel?.id) {
      text = "Zmieniono kanał";
    } else {
      text = "Wybrano kanał";
    }
    toast.success(text);
  };

  return (
    <>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        {isChannelLoading && <Loader active />}
        <Menu.Item onClick={openModal}>
          <span>
            <Icon name="exchange" /> Kanały{" "}
          </span>
          ({loadedChannels.length}) <Icon name="add" />
        </Menu.Item>
        {/*Channels*/}
        {loadedChannels.length > 0 &&
          loadedChannels.map((channel: ChannelDto) => {
            return (
              <Menu.Item
                className={selectedChannel?.id === channel.id ? "active" : ""}
                key={channel.id}
                name={channel.name}
                style={{ opacity: 0.7 }}
                onClick={() => handleChannel(channel)}
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
            <Modal.Actions className={channelsStyle.textRight}>
              <Button
                color="green"
                inverted
                disabled={isLoading}
                onClick={handleSubmit}
              >
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
