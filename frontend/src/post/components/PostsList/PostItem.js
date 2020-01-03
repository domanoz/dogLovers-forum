import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../../shared/components/UIElements/Avatar";
import Card from "../../../shared/components/UIElements/Card";

import "./PostItem.css";

const PostItem = props => {
  // console.log(props);
  return (
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
  );
};

export default PostItem;
