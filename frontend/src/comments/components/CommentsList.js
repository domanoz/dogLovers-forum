import React, { useContext } from "react";

import "./CommentsList.css";
import Card from "./../../shared/components/UIElements/Card";
import Button from "./../../shared/components/FormElements/Button";
import CommentItem from "./CommentItem";
import { AuthContext } from "./../../shared/context/auth-context";

const CommentsList = props => {
  // console.log(props.post);

  const auth = useContext(AuthContext);
  if (props.post.comments === undefined || props.post.comments.length === 0) {
    return (
      <React.Fragment>
        {auth.isLoggedIn && (
          <Button
            to={`/groups/${props.post.group}/posts/${props.post.id}/comments`}
            size="small"
            inverse
          >
            ANSWER TO POST
          </Button>
        )}
        <div className="center">
          <Card className="commentslist-item__content">
            <h2>No comments found.</h2>
          </Card>
        </div>
      </React.Fragment>
    );
  }
  // if (props.avatar === undefined) {
  //   props.avatar =
  //     "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  // }
  return (
    <React.Fragment>
      {auth.isLoggedIn && (
        <Button
          to={`/groups/${props.post.group}/posts/${props.post.id}/comments`}
          size="small"
          inverse
        >
          ANSWER TO POST
        </Button>
      )}
      <h4>COMMENTS</h4>
      <ul className="comments-list">
        {props.post.comments.map(comment => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            post_id={props.post.id}
            group={props.post.group}
            user={comment.user}
            text={comment.text}
            date={comment.date}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};
export default CommentsList;
