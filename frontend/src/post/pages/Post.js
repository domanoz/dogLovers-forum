import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostLayout from "./../components/PostLayout/PostLayout";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttp } from "../../shared/hooks/http-hook";

const Post = props => {
  const postId = useParams().postId;
  const groupId = useParams().groupId;

  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedData, setLoadedData] = useState();

  // console.log(postId);
  // console.log(groupId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            `/groups/${groupId}/posts/${postId}`
        );

        setLoadedData(responseData.data.post);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, postId, groupId]);
  // console.log(loadedData);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedData && <PostLayout post={loadedData} />}
    </React.Fragment>
  );
};

export default Post;
