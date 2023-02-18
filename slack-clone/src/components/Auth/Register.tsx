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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { FormError } from "../../error-model/form.error";

export const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<FormError[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const isFormValid = () => {
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

    if (!isPasswordValid()) {
      setErrors((prevState: FormError[]) => {
        prevState = [];
        prevState.push({
          message: "Wpisz poprawne hasło",
          fieldName: "password",
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
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name = "", value = "" } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "passwordConfirmation":
        setPasswordConfirmation(value);
        break;
    }
  };

  const isPasswordValid = () => {
    if (passwordConfirmation.length < 6 || password.length < 6) {
      return false;
    }

    if (password !== passwordConfirmation) {
      return false;
    }

    return true;
  };
  const handleSubmit = () => {
    if (!isFormValid()) {
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((registerUser) => {
        console.log(registerUser);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrors((prevState) => {
          prevState = [];

          const { code: errorCode = {} } =
            err?.customData?._tokenResponse?.error;

          prevState.push({
            message:
              errorCode === 400
                ? "Użytkownik o podanym mailu już istnieje"
                : err.message,
            fieldName: "email",
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
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Zarejestruj się do czatu
        </Header>
        {errors.length > 0 && (
          <Message error>
            <h3>Błędy</h3>
            {displayErrors()}
          </Message>
        )}
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Nazwa użytkownika"
              className={handleInputError("username")}
              onChange={handleChange}
              value={username}
            />
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
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Powtórz halo"
              type="password"
              onChange={handleChange}
              className={handleInputError("password")}
              value={passwordConfirmation}
            />
            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="orange"
              fluid
              size="large"
            >
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
