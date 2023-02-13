import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

export const Register = () => {
  const handleChange = () => {
    console.log("fds");
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Zarejestruj się do czatu
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email address"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="lock"
              iconPosition="left"
              placeholder="Password Confirmation"
              type="password"
              onChange={handleChange}
            />
            <Button color="orange" fluid size="large">
              Rejestruj się
            </Button>
          </Segment>
        </Form>
        <Message>
          Użytkownik <Link to="/login">Zaloguj się</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
