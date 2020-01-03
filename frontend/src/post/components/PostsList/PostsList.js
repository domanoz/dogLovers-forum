import React from "react";

import PostItem from "./PostItem";
import LikesItem from "../LikesItem";
import GroupNameItem from "./GroupNameItem";
import "./PostsList.css";
import Card from "../../../shared/components/UIElements/Card";

const PostsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No posts found.</h2>
        </Card>
      </div>
    );
  }
  // console.log(props.items.posts);

  return (
    <ul className="posts-list">
      {props.items.group.posts.map(post => {
        // console.log(props.items.group);
        if (post.avatar === undefined) {
          post.avatar =
            "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        }
        return (
          <React.Fragment key={post.id}>
            <LikesItem
              likes={post.likes.length}
              likesClass="posts-list__likes"
            />
            {
              <PostItem
                key={post.id}
                id={post.id}
                group={post.group}
                groupId={props.items.group.id}
                username={post.user.name}
                title={post.title}
                text={post.text}
                image={post.avatar}
                likes={post.likes}
                date={post.date}
                comments={post.comments}
              />
            }
            <GroupNameItem group={props.items.group} />
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default PostsList;
