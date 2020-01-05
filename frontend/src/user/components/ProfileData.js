import React from "react";
import { Link } from "react-router-dom";
import "./ProfileData.css";

import Card from "./../../shared/components/UIElements/Card";
import Button from "./../../shared/components/FormElements/Button";

const ProfileData = props => {
  // console.log(props.groupsData.length);

  return (
    <div className="main_container">
      <Card className="profile-item__card">
        <div className="group-list__header">Your profil:</div>
        <div className="user-data_name">Name: {props.userData.name} </div>
        <div className="user-data_email">Email: {props.userData.email} </div>
        <div className="user-data_email">Role: {props.userData.role} </div>

        {props.groupsData.length === 0 ? (
          <div className="cont_butt">
            <div>No groups</div>

            <Button to="/users/me/addDog">Add</Button>
          </div>
        ) : (
          <div className="user-data_dogs">Groups:</div>
        )}
        {props.groupsData.length ? (
          <React.Fragment>
            {props.groupsData.map(group => (
              <div key={group.id}>{group.name}</div>
            ))}
            <Button to="/users/me/addDog">Add/Remove</Button>
          </React.Fragment>
        ) : null}
        <Link to="/users/updateUserData">
          <Button className="button_inside" inverse>
            CHANGE DATA
          </Button>
        </Link>
      </Card>
      <Link to="/users/me/changePassword">
        <Button>CHANGE PASSWORD</Button>
      </Link>
    </div>
  );
};

export default ProfileData;
