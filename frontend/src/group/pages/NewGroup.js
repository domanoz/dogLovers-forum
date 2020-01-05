import React from "react";
import { useHistory } from "react-router-dom";

import "./NewGroup.css";
import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

import { useForm } from "./../../shared/hooks/form-hook";
// import { AuthContext } from "./../../shared/context/auth-context";
import { useHttp } from "./../../shared/hooks/http-hook";

import { VALIDATOR_REQUIRE } from "./../../shared/utils/validators";

const NewGroup = props => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const storedData = JSON.parse(localStorage.getItem("userData"));

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false
      }
    },
    false
  );
  const history = useHistory();

  const groupSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:8000/api/v1/groups/`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storedData.token
        }
      );
      history.goBack();
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="center">Adding new group</div>
      <form className="group-form" onSubmit={groupSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD GROUP
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewGroup;
