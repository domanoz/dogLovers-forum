import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./UserItem.css";
import Avatar from "./../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

import { AuthContext } from "../../shared/context/auth-context";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttp } from "../../shared/hooks/http-hook";

const UserItem = props => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const history = useHistory();
  const isActive = props.active;
  // console.log(isActive);
  const unbanUser = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:8000/api/v1/users/unbanAccount/${props.id}`,
        "PATCH",
        JSON.stringify({}),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
      history.go("/admin");
      // window.location.reload(true);
    } catch (err) {}
  };
  const banUser = async event => {
    event.preventDefault();
    // console.log("banning");
    try {
      await sendRequest(
        `http://localhost:8000/api/v1/users/deleteAccount/${props.id}`,
        "DELETE",
        JSON.stringify({}),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
      history.go("/admin");
      // window.location.reload(true);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="user_item__container">
        {isActive &&
        (auth.isAdmin === "admin" || auth.isAdmin === "moderator") ? (
          <Button size="vsmall" onClick={banUser} danger>
            BAN USER
          </Button>
        ) : (
          <Button size="vsmall" onClick={unbanUser} danger>
            UNBAN USER
          </Button>
        )}

        <li className="user-item">
          <Card>
            <div className="user-item__image">
              <Avatar image={props.avatar} alt={props.name} />
            </div>
            <div className="user-item__info">
              <h2>Name: {props.name}</h2>
              <h2>Email: {props.email}</h2>
              <h3>Role: {props.role} </h3>
              <h2>Active: {props.active.toString()} </h2>
            </div>
          </Card>
        </li>
      </div>
    </React.Fragment>
  );
};

export default UserItem;
