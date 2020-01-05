import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

import { AuthContext } from "./../../context/auth-context";

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/groups" exact>
          groups
        </NavLink>
      </li>
      {auth.isLoggedIn && auth.isAdmin && (
        <li>
          <NavLink to="/admin" exact>
            admin panel
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login" exact>
            login
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/signup">sign up</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/me">profile</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
