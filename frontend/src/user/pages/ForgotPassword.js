import React from "react";

import "./ForgotPassword.css";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useForm } from "../../shared/hooks/form-hook";
// import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL
} from "../../shared/utils/validators";

const ForgotPassword = props => {
  // const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const forgotPasswordSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:8000/api/v1/users/forgotPassword",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value
        }),
        { "Content-Type": "application/json" }
      );
      // console.log(responseData);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form
        className="forgotPassword-form"
        onSubmit={forgotPasswordSubmitHandler}
      >
        <Input
          id="email"
          element="input"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          RESET PASSWORD
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ForgotPassword;
