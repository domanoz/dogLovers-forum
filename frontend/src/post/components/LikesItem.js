import React from "react";
import { Link } from "react-router-dom";
import paw from "./../../img/paw.png";
import "./LikesItem.css";

const LikesItem = props => {
  return (
    <div className={"likes-item"}>
      <Link to={`/like`}>
        <div className="likes-item__image">
          <img src={paw} alt="paw" width="30px" height="30px" />
        </div>
      </Link>
      <div className={` ${props.likesClass}`}>{props.likes}</div>
    </div>
  );
};

export default LikesItem;
