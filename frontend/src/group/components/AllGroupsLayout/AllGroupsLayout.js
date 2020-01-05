import React from "react";
import Card from "../../../shared/components/UIElements/Card";
import "./AllGroupsLayout.css";
import { Link } from "react-router-dom";
import dog from "./../../../img/dog.png";

const AllGroupsLayout = props => {
  // console.log(props.groups);

  return (
    <ul className="groups-list">
      {props.groups.map(group => (
        <li key={group.id} className="allgroup-item">
          <Link to={`/groups/${group.id}`}>
            <Card className="allgroup-item__card">
              <img src={dog} alt="dog" width="20px" height="20px" />
              {group.name} <p> Number of posts: {group.posts.length}</p>
              <p> Members: {group.members.length}</p>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AllGroupsLayout;
