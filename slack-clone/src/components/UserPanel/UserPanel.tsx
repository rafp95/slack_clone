import { Dropdown, Grid, Header, Icon } from "semantic-ui-react";
import { auth } from "../../firebase";

export const UserPanel = () => {
  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log("Wylogowano");
    });
  };

  const dropDownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          {" "}
          Zalogowano jako <strong>Użytkownik</strong>{" "}
        </span>
      ),
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
          <Dropdown trigger={<span>User</span>} options={dropDownOptions()} />
        </Header>
      </Grid.Column>
    </Grid>
  );
};
