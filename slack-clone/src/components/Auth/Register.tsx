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
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth } from "../../firebase";
import { FormError } from "../../error-model/form.error";
import md5 from "md5";
import { getDatabase, ref, set } from "firebase/database";
import { emailRegx } from "../../utils/regex.validation";
import { createUser } from "../../api/Api.Firebase";
import { PasswordInput } from "./PasswordInput";

export const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<FormError[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [accountCreated, setAccountCreated] = useState<boolean>(false);

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

    if (isPasswordValid() != null) {
      setErrors((prevState: FormError[]) => {
        prevState = [];
        prevState.push({
          message: isPasswordValid() ?? "",
          fieldName: "password",
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

  const isPasswordValid = (): string | null => {
    if (passwordConfirmation.length < 6 || password.length < 6) {
      return "Minimalna długość znaków to 6";
    }

    if (password !== passwordConfirmation) {
      return "Podane hasła różnią się";
    }

    return null;
  };
  const handleSubmit = () => {
    setAccountCreated((prevState) => {
      prevState = false;
      return prevState;
    });

    if (!isFormValid()) {
      return;
    } else {
      setErrors((prevState: FormError[]) => {
        prevState = [];
        return prevState;
      });
    }

    setLoading((prevState) => {
      prevState = true;
      return prevState;
    });
    createUserWithEmailAndPassword(auth, email, password)
      .then((createdUser: UserCredential) => {
        console.log(createdUser);
        updateProfile(createdUser?.user, {
          displayName: username,
          photoURL: `https://www.gravatar.com/avatar/${md5(
            createdUser.user.email ?? ""
          )}?d=identicon`,
        })
          .then(() => {
            setLoading((prevState) => {
              prevState = false;
              return prevState;
            });

            setAccountCreated(true);

            saveUser(createdUser);
          })
          .catch((err) => {
            console.error(err);
            setLoading((prevState) => {
              prevState = false;
              return prevState;
            });
          });
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

  const saveUser = (createdUser: UserCredential) => {
    createUser(createdUser)
      .then(() => {
        console.log("Konto zapisane");
      })
      .catch((error) => {
        console.error(error);
      });
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
          Zarejestruj się
        </Header>
        {accountCreated ? (
          <Message success>Konto utworzone pomyślnie</Message>
        ) : (
          errors.length > 0 && (
            <Message error>
              <h3> {errors[0]?.allInputCheck ? "Błędy" : "Błąd"} </h3>

              {displayErrors()}
            </Message>
          )
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
            <PasswordInput
              handleInputError={handleInputError("password")}
              handleChange={handleChange}
              password={password}
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
