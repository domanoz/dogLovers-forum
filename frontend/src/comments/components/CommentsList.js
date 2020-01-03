import React from "react";

import "./CommentsList.css";
import Card from "./../../shared/components/UIElements/Card";
// import LikesItem from "./../../post/components/LikesItem";
import CommentItem from "./CommentItem";

const CommentsList = props => {
  if (props.comments === undefined || props.comments.length === 0) {
    return (
      <div className="center">
        <Card className="commentslist-item__content">
          <h2>No comments found.</h2>
        </Card>
      </div>
    );
  }
  // if (props.avatar === undefined) {
  //   props.avatar =
  //     "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  // }
  return (
    <ul className="comments-list">
      {props.comments.map(comment => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          user={comment.user}
          text={comment.text}
          date={comment.date}
        />
      ))}
    </ul>
  );
};
export default CommentsList;
