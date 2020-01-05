import React from "react";
import "./ProfileLayout.css";
import PostsList from "../../post/components/PostsList/PostsList";
import ProfileData from "./ProfileData";

const ProfileLayout = props => {
  return (
    <div className="profilelayout_container">
      <PostsList items={props.posts} />
      <ProfileData userData={props.user} groupsData={props.groups} />
    </div>
  );
};

export default ProfileLayout;
