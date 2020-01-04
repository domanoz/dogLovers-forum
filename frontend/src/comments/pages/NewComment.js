import React from "react";
import { useParams, useHistory } from "react-router-dom";

import "./NewComment.css";
import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

import { useForm } from "./../../shared/hooks/form-hook";
// import { AuthContext } from "./../../shared/context/auth-context";
import { useHttp } from "./../../shared/hooks/http-hook";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH
} from "./../../shared/utils/validators";

const NewComment = props => {
  //const auth = useContext(AuthContext);
  const groupId = useParams().groupId;
  const postId = useParams().postId;

  const { isLoading, error, sendRequest, clearError } = useHttp();
  const storedData = JSON.parse(localStorage.getItem("userData"));

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      text: {
        value: "",
        isValid: false
      }
    },
    false
  );
  const history = useHistory();

  // console.log(loadedData);
  const commentSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:8000/api/v1/groups/${groupId}/posts/${postId}/comments`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          text: formState.inputs.text.value
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storedData.token
        }
      );
      history.push(`/${groupId}/${postId}`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="center">Answering to post</div>
      <form className="comment-form" onSubmit={commentSubmitHandler}>
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
          id="text"
          element="textarea"
          label="Text"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(200)]}
          errorText="Please enter a valid text"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD COMMENT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewComment;
