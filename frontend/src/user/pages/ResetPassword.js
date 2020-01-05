import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./ResetPassword.css";
import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

import { useForm } from "./../../shared/hooks/form-hook";
import { AuthContext } from "./../../shared/context/auth-context";
import { useHttp } from "./../../shared/hooks/http-hook";

import { VALIDATOR_MINLENGTH } from "./../../shared/utils/validators";

const ResetPassword = props => {
  const auth = useContext(AuthContext);
  const token = useParams().token;
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [formState, inputHandler] = useForm(
    {
      password: {
        value: "",
        isValid: false
      },
      confirmPassword: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const resetPasswordSubmitHandler = async event => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `http://localhost:8000/api/v1/users/resetPassword/${token}`,
        "PATCH",
        JSON.stringify({
          password: formState.inputs.password.value,
          confirmPassword: formState.inputs.confirmPassword.value
        }),
        { "Content-Type": "application/json" }
      );
      console.log(auth.isAdmin);
      auth.login(
        responseData.data.user._id,
        responseData.token,
        responseData.data.user.role
      );
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="resetPass-form" onSubmit={resetPasswordSubmitHandler}>
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Password needs at least 8 letters"
          onInput={inputHandler}
        />
        <Input
          id="confirmPassword"
          element="input"
          type="password"
          label="Confirm Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Confirm your password!"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          RESET
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ResetPassword;
