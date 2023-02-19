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
import { useState } from "react";
import { FormError } from "../../error-model/form.error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const emailRegx =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormError[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isFormValid = (): boolean => {
    if (isFormEmpty()) {
      setErrors((prevState: FormError[]) => {
        prevState = [];
        prevState.push({
          message: "Uzupełnij wszystkie pola",
          allInputCheck: true,
        });
        return prevState;
      });
      return false;
    }

    if (!email.match(emailRegx)) {
      setErrors((prevState: FormError[]) => {
        prevState = [];
        prevState.push({
          message: "Podaj poprawny adres email",
          fieldName: "email",
        });
        return prevState;
      });
      return false;
    }

    return true;
  };

  const displayErrors = () => {
    return errors.map((error: FormError, i) => <p key={i}>{error.message}</p>);
  };

  const isFormEmpty = () => {
    return !email.length || !password.length;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name = "", value = "" } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      return;
    } else {
      setErrors((prevState: FormError[]) => {
        prevState = [];
        return prevState;
      });
    }
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((signedUser) => {
        console.log(signedUser);
        setLoading(false);
      })
      .catch((err) => {
        setErrors((prevState: FormError[]) => {
          prevState = [];
          prevState.push({
            message: "Niepoprawny login lub hasło",
          });
          return prevState;
        });
        setLoading(false);
      });

    return false;
  };

  const handleInputError = (inputName: string) => {
    return errors.some((_) => _.fieldName === inputName || _.allInputCheck)
      ? "error"
      : "";
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="violet" textAlign="center">
          <Icon name="puzzle piece" color="violet" />
          Zaloguj się
        </Header>
        {errors.length > 0 && (
          <Message error>
            <h3> {errors[0]?.allInputCheck ? "Błędy" : "Błąd"} </h3>

            {displayErrors()}
          </Message>
        )}
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              className={handleInputError("email")}
              onChange={handleChange}
              value={email}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Hasło"
              className={handleInputError("password")}
              type="password"
              onChange={handleChange}
              value={password}
            />
            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="violet"
              fluid
              size="large"
            >
              Zaloguj
            </Button>
          </Segment>
        </Form>
        <Message>
          Nie masz jeszcze konta <Link to="/register">Zarejestruj się</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
