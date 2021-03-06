import React, { useContext } from "react";

import "./Signup.css";
import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useForm } from "./../../shared/hooks/form-hook";
import { AuthContext } from "./../../shared/context/auth-context";
import { useHttp } from "./../../shared/hooks/http-hook";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from "./../../shared/utils/validators";

const Signup = props => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false
      },
      email: {
        value: "",
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      },
      confirmpassword: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const signupSubmitHandler = async event => {
    event.preventDefault();
    // console.log(formState.inputs);
    try {
      const formData = new FormData();
      formData.append("email", formState.inputs.email.value);
      formData.append("name", formState.inputs.name.value);
      formData.append("password", formState.inputs.password.value);
      formData.append(
        "confirmPassword",
        formState.inputs.confirmpassword.value
      );
      formData.append("image", formState.inputs.image.value);

      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/signup",

        "POST",
        formData
      );

      auth.login(responseData.data.user._id, responseData.token);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="signup-form" onSubmit={signupSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name"
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email"
          onInput={inputHandler}
        />
        <ImageUpload center id="image" onInput={inputHandler} />
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
          id="confirmpassword"
          element="input"
          type="password"
          label="ConfirmPassword"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Confirm password!"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          SIGN UP
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Signup;
