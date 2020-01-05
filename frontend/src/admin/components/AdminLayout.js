import React from "react";

// import "./AdminLayout.css";

import UsersList from "./UsersList";

const AdminLayout = props => {
  // console.log(props.items);
  return <UsersList users={props.items} />;
};

export default AdminLayout;
