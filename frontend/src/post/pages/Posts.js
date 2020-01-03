import React from "react";
import PostsList from "./../components/PostsList";

const Posts = () => {
  const POSTS = [
    {
      id: "p01",
      user: "Test name",
      group: "Test group",
      title: "Test title",
      text: "Some test text inside post",
      avatar:
        "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      likes: 4,
      date: "11.04.2019"
    }
  ];

  return <PostsList items={POSTS} />;
};

export default Posts;
