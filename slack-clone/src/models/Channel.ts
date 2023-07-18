export interface ChannelDetails {
  channelName: string;
  channelDetails: string;
}

export interface Channel {
  channels: Array<ChannelDetails>;
  modal: boolean;
  channelName: string;
  chanelDetails: string;
}

export interface ChannelCreated {
  createdBy: {
    avatar: string;
    name: string;
  };
  details: string;
  id: string;
  name: string;
}

export interface ChannelActionWithPayload {
  type: string;
  payload?: {
    currentChannel: object;
  };
}
