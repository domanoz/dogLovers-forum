import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
import ProfileLayout from "./../components/ProfileLayout";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./../../shared/context/auth-context";

const Profile = props => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedUserPosts, setLoadedUserPosts] = useState();
  const [loadedUserData, setLoadedUserData] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePostsData = await sendRequest(
          `http://localhost:8000/api/v1/posts/me`,
          "GET",
          JSON.stringify(),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token
          }
        );

        setLoadedUserPosts(responsePostsData);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, auth.token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUserData = await sendRequest(
          `http://localhost:8000/api/v1/users/me`,
          "GET",
          JSON.stringify(),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token
          }
        );

        setLoadedUserData(responseUserData.data);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, auth.token]);

  // console.log(loadedUserPosts, loadedUserData);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUserPosts && (
        <ProfileLayout posts={loadedUserPosts} user={loadedUserData} />
      )}
    </React.Fragment>
  );
};

export default Profile;
