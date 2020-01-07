import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Signup.css";
import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

import { useForm } from "./../../shared/hooks/form-hook";
import { AuthContext } from "./../../shared/context/auth-context";
import { useHttp } from "./../../shared/hooks/http-hook";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "./../../shared/utils/validators";

const NewPassword = props => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttp();
  const history = useHistory();

  const [formState, inputHandler] = useForm(
    {
      currentPassword: {
        value: "",
        isValid: false
      },
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

  const passwordSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/changePassword",
        "PATCH",
        JSON.stringify({
          currentPassword: formState.inputs.currentPassword.value,
          password: formState.inputs.password.value,
          confirmPassword: formState.inputs.confirmPassword.value
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
      auth.logout();
      history.goBack();
      // auth.login(responseData.data.user._id, responseData.token);
      // console.log(responseData.data.user + " TOKEN : " + responseData.token);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="signup-form" onSubmit={passwordSubmitHandler}>
        <Input
          id="currentPassword"
          element="input"
          type="password"
          label="Current Password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid password"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="New Password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid password"
          onInput={inputHandler}
        />
        <Input
          id="confirmPassword"
          element="input"
          type="password"
          label="Confirm Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a valid confirm password"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          CHANGE PASSWORD
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPassword;
