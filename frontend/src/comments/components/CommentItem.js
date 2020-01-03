import React from "react";
import "./CommentItem.css";
import Card from "./../../shared/components/UIElements/Card";
import Avatar from "./../../shared/components/UIElements/Avatar";

const CommentItem = props => {
  if (props.user.avatar === undefined) {
    props.user.avatar =
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  }
  return (
    <li className="comment-item">
      {/* <h2>comment</h2> */}
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
  );
};

export default CommentItem;
