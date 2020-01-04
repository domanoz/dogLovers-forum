import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_MINLENGTH } from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./NewComment.css";

const UpdateComment = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedComment, setLoadedComment] = useState();
  const commentId = useParams().commentId;
  const history = useHistory();
  // console.log(postId);
  const [formState, inputHandler, setFormData] = useForm(
    {
      text: {
        value: "",
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/v1/comments/${commentId}`
        );

        setLoadedComment(responseData.data.comment);
        setFormData(
          {
            text: {
              value: responseData.data.comment.text,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };

    fetchData();
  }, [sendRequest, commentId, setFormData]);

  const commentUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:8000/api/v1/comments/update/${commentId}`,
        "PATCH",
        JSON.stringify({
          text: formState.inputs.text.value
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
      history.goBack();
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedComment && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find a comment!</h2>
        </Card>
      </div>
    );
  }
  // console.log(loadedComment);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedComment && (
        <form className="comment-form" onSubmit={commentUpdateSubmitHandler}>
          <Input
            id="text"
            element="textarea"
            label="Text"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedComment.text}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE COMMENT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateComment;
