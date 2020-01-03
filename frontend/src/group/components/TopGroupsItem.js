import React from "react";
import { Link } from "react-router-dom";
import dog from "./../../img/dog.png";
import "./TopGroupsItem.css";

const TopGroupsItem = props => {
  return (
    <li className="topgroup-item">
      <img src={dog} alt="dog" width="20px" height="20px" />
      <Link to={`/groups/${props.group.id}`}>{props.group.name}</Link>
    </li>
  );
};

export default TopGroupsItem;
