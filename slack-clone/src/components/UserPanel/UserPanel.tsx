import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";
import { auth } from "../../firebase";
import { useStore } from "react-redux";
import { useEffect, useState } from "react";
import { LoggedUser } from "../../models/LoggedUser";
import { FirebaseUser } from "../../models/FirebaseUser";
import { initialUserState } from "../../reducers";

export const UserPanel = () => {
  const [loggedUser, setLoggedUser] = useState<FirebaseUser>(initialUserState);
  const store = useStore();
  useEffect(() => {
    const { user }: any = store.getState();
    if (user) {
      setLoggedUser(user as FirebaseUser);
    }
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log("Wylogowano");
    });
  };

  const dropDownOptions = () => [
    {
      key: "user",
      text: <span>{loggedUser.currentUser?.email}</span>,
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Zmień awatar</span>,
    },
    {
      key: "signout",
      text: <span onClick={handleSignOut}>Wyloguj</span>,
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
                <Image src={loggedUser.currentUser?.photoURL} avatar />
                {loggedUser.currentUser?.displayName}
              </span>
            }
            options={dropDownOptions()}
          />
        </Header>
      </Grid.Column>
    </Grid>
  );
};
