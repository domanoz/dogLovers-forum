import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import Card from "./../../shared/components/UIElements/Card";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from "./../../shared/utils/validators";

import { useForm } from "./../../shared/hooks/form-hook";
import { useHttp } from "./../../shared/hooks/http-hook";
import { AuthContext } from "./../../shared/context/auth-context";
import "./UpdateUserData.css";

const UpdateUserData = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedUser, setLoadedUser] = useState();

  const history = useHistory();
  // console.log(postId);
  const [formState, inputHandler, setFormData] = useForm(
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
      }
    },
    false
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/users/me`,
          "GET",
          JSON.stringify(),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token
          }
        );

        setLoadedUser(responseData.data);
        setFormData(
          {
            name: {
              value: responseData.data.name,
              isValid: true
            },
            email: {
              value: responseData.data.email,
              isValid: true
            },
            image: {
              value: null,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };

    fetchData();
  }, [sendRequest, auth.token, setFormData]);

  const userUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", formState.inputs.email.value);
      formData.append("name", formState.inputs.name.value);
      formData.append("image", formState.inputs.image.value);

      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/users/updateUserData`,
        "PATCH",
        formData,
        {
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

  if (!loadedUser && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find a user!</h2>
        </Card>
      </div>
    );
  }
  // console.log(loadedUser);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUser && (
        <form className="user-form" onSubmit={userUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
            initialValue={loadedUser.name}
            initialValid={true}
          />
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email ."
            onInput={inputHandler}
            initialValue={loadedUser.email}
            initialValid={true}
          />
          <ImageUpload center id="image" onInput={inputHandler} />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE USER DATA
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateUserData;
