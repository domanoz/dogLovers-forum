import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./CommentItem.css";
import Card from "./../../shared/components/UIElements/Card";
import Avatar from "./../../shared/components/UIElements/Avatar";

import Button from "./../../shared/components/FormElements/Button";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

import { useHttp } from "./../../shared/hooks/http-hook";
import { AuthContext } from "./../../shared/context/auth-context";

const CommentItem = props => {
  if (props.user.avatar === undefined) {
    props.user.avatar =
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  }
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const storedData = JSON.parse(localStorage.getItem("userData"));

  const deleteComment = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:8000/api/v1/comments/${props.id}`,
        "DELETE",
        JSON.stringify({}),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storedData.token
        }
      );
      history.goBack();
    } catch (err) {}
  };
  // console.log(props.group, props.id);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}

      <li className="comment-item">
        {(auth.userId === props.user._id ||
          auth.isAdmin === "admin" ||
          auth.isAdmin === "moderator") && (
          <Button size="vsmall" onClick={deleteComment} danger>
            DELETE
          </Button>
        )}
        {(auth.userId === props.user._id ||
          auth.isAdmin === "admin" ||
          auth.isAdmin === "moderator") && (
          <Button size="vsmall" to={`/comments/update/${props.id}`} danger>
            EDIT
          </Button>
        )}
        <Card className="comment-item__content">
          <div className="comment-item__image">
            <Avatar image={props.user.avatar} alt="user" />
          </div>
          <div className="comment-item__info">
            <h2>
              by {props.user.name} on {props.date}
            </h2>
            <h3>{props.text} </h3>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default CommentItem;
