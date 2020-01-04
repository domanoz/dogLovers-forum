import React, { useContext } from "react";

import paw from "./../../img/paw.png";
import paw_red from "./../../img/paw_red.png";
import "./LikesItem.css";

import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

import { AuthContext } from "./../../shared/context/auth-context";
import { useHttp } from "./../../shared/hooks/http-hook";

const LikesItem = props => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const storedData = JSON.parse(localStorage.getItem("userData"));

  const likeHandler = async event => {
    if (props.userLike) {
      event.preventDefault();
      try {
        await sendRequest(
          `http://localhost:8000/api/v1/posts/unlike/${props.postId}`,
          "POST",
          JSON.stringify({}),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + storedData.token
          }
        );

        window.location.reload();
      } catch (err) {}
    } else {
      event.preventDefault();
      try {
        await sendRequest(
          `http://localhost:8000/api/v1/posts/like/${props.postId}`,
          "POST",
          JSON.stringify({ userId: auth.userId }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + storedData.token
          }
        );

        window.location.reload();
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className={"likes-item"}>
        <button onClick={likeHandler}>
          <div className="likes-item__image">
            {!props.userLike ? (
              <img src={paw} alt="paw" width="30px" height="30px" />
            ) : (
              <img src={paw_red} alt="paw_red" width="30px" height="30px" />
            )}
          </div>
        </button>
        <div className={` ${props.likesClass}`}>{props.likes}</div>
      </div>
    </React.Fragment>
  );
};

export default LikesItem;
