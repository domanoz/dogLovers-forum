import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import "./AddDogLayout.css";

import dog from "./../../img/dog.png";
// import Button from "./../../shared/components/FormElements/Button";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

import { AuthContext } from "./../../shared/context/auth-context";
import { useHttp } from "./../../shared/hooks/http-hook";

const AddDogLayout = props => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttp();
  const history = useHistory();

  const addNewDog = (groupName, id) => async event => {
    event.preventDefault();
    try {
      // console.log(id, groupName);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/groups/addDog",
        "POST",
        JSON.stringify({
          id: id,
          groupName: groupName
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
    } catch (err) {}

    history.goBack();
  };
  const removeDog = (groupName, id) => async event => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/groups/removeDog",
        "POST",
        JSON.stringify({
          id: id,
          groupName: groupName
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
    } catch (err) {}

    history.goBack();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <h2 className="center">Click to add or remove group/dog</h2>
      <ul className="dog-list">
        {props.groups.map(group => {
          if (
            group.members.filter(member => member._id === auth.userId).length >
            0
          ) {
            return (
              <li key={group.id} className="dog-item">
                <h4>In Group</h4>
                <div
                  onClick={removeDog(group.name, group.id)}
                  className="button_dog"
                >
                  <Card className="dog-item__card">
                    <img src={dog} alt="dog" width="20px" height="20px" />
                    {group.name} <p> Number of posts: {group.posts.length}</p>
                    <p> Members: {group.members.length}</p>
                  </Card>
                </div>
              </li>
            );
          } else {
            return (
              <li key={group.id} className="dog-item">
                <h4>Not in Group</h4>
                <div
                  onClick={addNewDog(group.name, group.id)}
                  className="button_dog"
                >
                  <Card className="dog-item__card">
                    <img src={dog} alt="dog" width="20px" height="20px" />
                    {group.name} <p> Number of posts: {group.posts.length}</p>
                    <p> Members: {group.members.length}</p>
                  </Card>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </React.Fragment>
  );
};

export default AddDogLayout;
