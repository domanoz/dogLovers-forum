import React, { useContext } from "react";

import Avatar from "../../../shared/components/UIElements/Avatar";
import Card from "../../../shared/components/UIElements/Card";
import CommentsList from "./../../../comments/components/CommentsList";
import LikesItem from "./../LikesItem";
import Button from "./../../../shared/components/FormElements/Button";
import "./PostLayout.css";

import ErrorModal from "./../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../../shared/components/UIElements/LoadingSpinner";

import { useHttp } from "./../../../shared/hooks/http-hook";
import { AuthContext } from "./../../../shared/context/auth-context";

const PostLayout = props => {
  // console.log(props.post);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const storedData = JSON.parse(localStorage.getItem("userData"));

  if (props.post.avatar === undefined) {
    props.post.avatar =
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  }

  const deletePost = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:8000/api/v1/posts/${props.post.id}`,
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

  const findUserLike = likes => {
    if (likes.filter(like => like.user === auth.userId).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  // console.log(props.post);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="postlayout-item">
        {(auth.userId === props.post.user._id || auth.isAdmin === "admin") && (
          <Button size="vsmall" onClick={deletePost} danger>
            DELETE
          </Button>
        )}
        {(auth.userId === props.post.user._id || auth.isAdmin === "admin") && (
          <Button size="vsmall" to={`/posts/update/${props.post.id}`} danger>
            EDIT
          </Button>
        )}
        <Card className="postlayout-item__content">
          <LikesItem
            likes={props.post.likes.length}
            userLike={findUserLike(props.post.likes)}
            likesClass="postlayout-item__likes"
            postId={props.post.id}
          />
          <div className="postlayout-item__image">
            <Avatar
              image={props.post.avatar}
              alt={props.post.title}
              width="3rem"
            />
          </div>
          <div className="cont_content">
            <h2 className="postlayout__h2_user">
              by {props.post.user.name} on {props.post.date}
            </h2>
            <div className="postlayout-item__info">
              <h2>{props.post.title}</h2>
              <h3 className="postlayout__h2_text">{props.post.text} </h3>
            </div>
          </div>
        </Card>
        <CommentsList post={props.post} />
      </div>
    </React.Fragment>
  );
};

export default PostLayout;
