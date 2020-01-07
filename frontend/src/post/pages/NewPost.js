import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import "./NewPost.css";
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

const NewPost = props => {
  //const auth = useContext(AuthContext);
  const groupId = useParams().groupId;

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
  const [loadedData, setLoadedData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/groups/${groupId}`
        );

        setLoadedData(responseData.data.group.name);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, groupId]);

  // console.log(loadedData);
  const postSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/groups/${groupId}/posts`,
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
      history.push(`/groups/${groupId}`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="center">Posting in group: {loadedData}</div>
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
          id="text"
          element="textarea"
          label="Text"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(200)]}
          errorText="Please enter a valid text"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD POST
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPost;
