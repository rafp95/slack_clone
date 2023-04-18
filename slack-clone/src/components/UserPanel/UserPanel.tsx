import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";
import { auth } from "../../firebase";
import { FirebaseUser } from "../../models/FirebaseUser";
import { toast } from "react-toastify";
import { LoggedUser } from "../../models/LoggedUser";

export interface UserPanelProps {
  loggedUser?: LoggedUser;
}

export const UserPanel = ({ loggedUser }: UserPanelProps) => {
  const handleSignOut = () => {
    auth.signOut().then(() => {
      toast.info("Wylogowano");
    });
  };

  const dropDownOptions = () => [
    {
      key: "user",
      text: <span>{loggedUser?.email}</span>,
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Zmień awatar</span>,
    },
    {
      key: "signout",
      text: <div onClick={handleSignOut}>Wyloguj</div>,
    },
  ];

  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          {/*App Header*/}
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>DevChat</Header.Content>
          </Header>
        </Grid.Row>
        {/*User Dropdown*/}
        <Header style={{ padding: ".25em" }} as="h4" inverted>
          <Dropdown
            trigger={
              <span>
                <Image src={loggedUser?.photoURL} avatar />
                {loggedUser?.displayName}
              </span>
            }
            options={dropDownOptions()}
          />
        </Header>
      </Grid.Column>
    </Grid>
  );
};
