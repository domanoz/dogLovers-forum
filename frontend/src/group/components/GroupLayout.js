import React from "react";

import "./GroupLayout.css";
import TopGroups from "./TopGroups";
import PostsList from "../../post/components/PostsList/PostsList";

const GroupLayout = props => {
  // console.log(props.items);
  return (
    <div className="grouplayout_container">
      <PostsList items={props.items} />
      <TopGroups items={props.items.topGroups} />
    </div>
  );
};

export default GroupLayout;
