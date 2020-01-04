import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Avatar from "../../../shared/components/UIElements/Avatar";
import Card from "../../../shared/components/UIElements/Card";
import Button from "./../../../shared/components/FormElements/Button";
import "./PostItem.css";
import { AuthContext } from "./../../../shared/context/auth-context";

import ErrorModal from "./../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../../shared/components/UIElements/LoadingSpinner";

import { useHttp } from "./../../../shared/hooks/http-hook";

const PostItem = props => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttp();
  const storedData = JSON.parse(localStorage.getItem("userData"));

  const deletePost = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:8000/api/v1/posts/${props.postId}`,
        "DELETE",
        JSON.stringify({}),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storedData.token
        }
      );
      window.location.reload();
    } catch (err) {}
  };

  // console.log(props.postId);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="post_item__container">
        {auth.userId === props.userID && (
          <Button size="vsmall" onClick={deletePost} danger>
            DELETE
          </Button>
        )}
        {auth.userId === props.userID && (
          <Button size="vsmall" to={`/posts/update/${props.postId}`} danger>
            EDIT
          </Button>
        )}
        <li className="post-item">
          <Card className="post-item__content">
            <Link to={`/${props.groupId}/${props.id}`}>
              <div className="post-item__image">
                <Avatar image={props.image} alt={props.title} />
              </div>
              <div className="post-item__info">
                <h2>
                  by {props.username} on {props.date}
                </h2>
                <h3>{props.title} </h3>
              </div>
            </Link>
          </Card>
        </li>
      </div>
    </React.Fragment>
  );
};

export default PostItem;
