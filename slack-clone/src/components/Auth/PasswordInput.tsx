import { Form } from "semantic-ui-react";
import React, { useState } from "react";

type inputType = "password" | "text";
type passwordIcon = "eye" | "eye slash outline";

const showHidePassword: string = "showHidePassword";

interface PasswordProps {
  handleInputError: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
}

export const PasswordInput = ({
  handleInputError,
  handleChange,
  password,
}: PasswordProps) => {
  const [passwordIcon, setPasswordIcon] = useState<passwordIcon>("eye");
  const [passwordType, setPasswordType] = useState<inputType>("password");

  const changePasswordInputType = (e: React.FormEvent<HTMLInputElement>) => {
    const { type = "" }: any = e.target;
    if (type.toLowerCase() !== "submit") {
      e.preventDefault();
      setPasswordType((prevState) => {
        if (prevState === "password") {
          prevState = "text";
          setPasswordIcon("eye slash outline");
        } else {
          setPasswordIcon("eye");
          prevState = "password";
        }
        return prevState;
      });
    }
  };

  return (
    <>
      <Form.Input
        fluid
        name="password"
        icon="lock"
        iconPosition="left"
        placeholder="Hasło"
        className={handleInputError}
        type={passwordType}
        onChange={handleChange}
        value={password}
        action={{
          icon: passwordIcon,
          onClick: changePasswordInputType,
          className: showHidePassword,
        }}
      />
    </>
  );
};
