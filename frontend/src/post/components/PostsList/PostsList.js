import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";
import LikesItem from "../LikesItem";
import GroupNameItem from "./GroupNameItem";
import "./PostsList.css";
import Card from "../../../shared/components/UIElements/Card";
import Button from "./../../../shared/components/FormElements/Button";

import { AuthContext } from "./../../../shared/context/auth-context";

const PostsList = props => {
  const auth = useContext(AuthContext);

  const findUserLike = likes => {
    if (likes.filter(like => like.user === auth.userId).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // console.log(liked);
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No posts found.</h2>
        </Card>
      </div>
    );
  }
  // console.log(auth.isAdmin);

  return (
    <div className="posts_container">
      {props.items.group && auth.isLoggedIn ? (
        <div className="newpost_button">
          <Link to={`/groups/${props.items.group.id}/posts`}>
            <Button danger>NEW POST ON {props.items.group.name}</Button>
          </Link>
        </div>
      ) : null}

      <ul className="posts-list">
        {props.items.group
          ? props.items.group.posts.map(post => {
              // console.log(props.items.group);
              // if (post.avatar === undefined) {
              //   post.avatar =
              //     "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
              // }
              return (
                <div className="singlePost" key={post.id}>
                  <LikesItem
                    likes={post.likes.length}
                    userLike={findUserLike(post.likes)}
                    likesClass="posts-list__likes"
                    postId={post.id}
                    groupId={props.items.group.id}
                  />
                  {
                    <PostItem
                      key={post.id}
                      id={post.id}
                      group={post.group}
                      groupId={props.items.group.id}
                      username={post.user.name}
                      userID={post.user._id}
                      postId={post.id}
                      title={post.title}
                      text={post.text}
                      image={post.user.avatar}
                      likes={post.likes}
                      date={post.date}
                      comments={post.comments}
                    />
                  }
                  <GroupNameItem group={props.items.group} />
                </div>
              );
            })
          : props.items.posts.map(post => {
              // console.log(props.items.group);
              // if (post.avatar === undefined) {
              //   post.avatar =
              //     "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
              // }
              return (
                <div className="singlePost" key={post.id}>
                  <LikesItem
                    likes={post.likes.length}
                    userLike={findUserLike(post.likes)}
                    likesClass="posts-list__likes"
                    postId={post.id}
                    groupId={post.group}
                  />
                  {
                    <PostItem
                      key={post.id}
                      id={post.id}
                      group={post.group}
                      groupId={post.group}
                      username={post.user.name}
                      userID={post.user._id}
                      postId={post.id}
                      title={post.title}
                      text={post.text}
                      image={post.user.avatar}
                      likes={post.likes}
                      date={post.date}
                      comments={post.comments}
                    />
                  }
                  {/* <GroupNameItem group={props.items.group} /> */}
                </div>
              );
            })}
      </ul>
    </div>
  );
};

export default PostsList;
