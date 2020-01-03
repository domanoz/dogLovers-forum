import React from "react";

import "./NewPost.css";
import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";

import { useForm } from "./../../shared/hooks/form-hook";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "./../../shared/utils/validators";

const NewPost = props => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const postSubmitHandler = event => {
    event.preventDefault();
    console.log("Adding new post...");
  };

  return (
    <form className="post-form" onSubmit={postSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid text"
        onInput={inputHandler}
      />

      <Button type="submit" disabled={!formState.isValid}>
        ADD POST
      </Button>
    </form>
  );
};

export default NewPost;
