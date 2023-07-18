import { Header, Icon, Input, Segment } from "semantic-ui-react";
import React from "react";
import { ChannelCreated } from "../../models/Channel";

interface MessagesHeaderProps {
  selectedChannel?: ChannelCreated | null;
}

export const MessagesHeader = ({ selectedChannel }: MessagesHeaderProps) => {
  return (
    <Segment clearing>
      {/**/}
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          Channel {selectedChannel?.name}
          <Icon name={"star outline"} color="black" />
        </span>
        <Header.Subheader>2 użytkownicy</Header.Subheader>
      </Header>
      <Header floated="right">
        <Input
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Wyszukaj wiadomości"
        />
      </Header>
    </Segment>
  );
};
