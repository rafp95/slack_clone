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

export interface ChanelDto {
  createdBy: {
    avatar: string;
    name: string;
  };
  details: string;
  id: string;
  name: string;
}
