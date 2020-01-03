import React from "react";
// import { Link } from "react-router-dom";
// import { withRouter } from "react-router-dom";
import Avatar from "../../../shared/components/UIElements/Avatar";
import Card from "../../../shared/components/UIElements/Card";
import CommentsList from "./../../../comments/components/CommentsList";
import LikesItem from "./../LikesItem";
import "./PostLayout.css";

const PostLayout = props => {
  console.log(props.post);
  if (props.post.avatar === undefined) {
    props.post.avatar =
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  }
  return (
    <div className="postlayout-item">
      <Card className="postlayout-item__content">
        <LikesItem
          likes={props.post.likes.length}
          likesClass="postlayout-item__likes"
        />
        <div className="postlayout-item__image">
          <Avatar
            image={props.post.avatar}
            alt={props.post.title}
            width="3rem"
          />
        </div>
        <h2 className="postlayout__h2_user">
          by {props.post.user.name} on {props.post.date}
        </h2>
        <div className="postlayout-item__info">
          <h2>{props.post.title}</h2>
          <h3 className="postlayout__h2_text">{props.post.text} </h3>
        </div>{" "}
      </Card>
      <CommentsList comments={props.post.comments} />
    </div>
  );
};

export default PostLayout;
