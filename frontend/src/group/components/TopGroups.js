import React from "react";
import "./TopGroups.css";
import TopGroupsItem from "./TopGroupsItem";
import Button from "./../../shared/components/FormElements/Button";

const TopGroups = props => {
  return (
    <div className="grouplist_container">
      <div className="group-list__header">Top dog lover's groups</div>
      <ul className="group-list">
        {props.items.map(item => (
          <TopGroupsItem key={item.id} group={item} />
        ))}
      </ul>
      <Button inverse>SEE ALL GROUPS</Button>
    </div>
  );
};

export default TopGroups;
