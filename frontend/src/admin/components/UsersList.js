import React, { useContext } from "react";

import UserItem from "./UserItem";
import "./UsersList.css";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";

const UsersList = props => {
  const auth = useContext(AuthContext);

  if (props.users.length === 0) {
    return (
      <div className="admin_button_group">
        {auth.isAdmin === "admin" ? (
          <Button size="normal" to="/groups/newGroup" danger>
            ADD NEW GROUP
          </Button>
        ) : null}
        <div className="center">
          <Card>
            <h2>No users found.</h2>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="admin_button_group">
      {auth.isAdmin === "admin" ? (
        <Button size="normal" to="/groups/newGroup" danger>
          ADD NEW GROUP
        </Button>
      ) : null}
      <ul className="users-list">
        {props.users.map(user => {
          // if (user.avatar === undefined) {
          //   user.avatar =
          //     "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
          // }
          return (
            <UserItem
              key={user._id}
              avatar={user.avatar}
              role={user.role}
              id={user._id}
              active={user.active}
              name={user.name}
              email={user.email}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default UsersList;
