import React from "react";
import { Link } from "react-router-dom";

import "./GroupNameItem.css";

const GroupNameItem = props => {
  return (
    <div className="groupname-item">
      <Link to={`/${props.group.id}`}>
        <div className="groupname-item__info">{props.group.name}</div>
      </Link>
    </div>
  );
};

export default GroupNameItem;
