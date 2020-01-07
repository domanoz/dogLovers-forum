import React, { useContext } from "react";

import "./Login.css";
import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

import { useForm } from "./../../shared/hooks/form-hook";
import { AuthContext } from "./../../shared/context/auth-context";
import { useHttp } from "./../../shared/hooks/http-hook";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from "./../../shared/utils/validators";

const Login = props => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const loginSubmitHandler = async event => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/login",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        { "Content-Type": "application/json" }
      );
      // if(responseData.data.user.role === "admin")
      // {
      //   auth.
      // }

      auth.login(
        responseData.data.user._id,
        responseData.token,
        responseData.data.user.role
      );

      // console.log(responseData.data.user + " TOKEN : " + responseData.token);
    } catch (err) {}
  };
  // console.log(auth.isAdmin);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="login-form" onSubmit={loginSubmitHandler}>
        <Input
          id="email"
          element="input"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Password needs at least 8 letters"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          LOG IN
        </Button>
        <Button to="/users/forgotPassword" inverse>
          FORGOT PASSWORD?
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Login;
