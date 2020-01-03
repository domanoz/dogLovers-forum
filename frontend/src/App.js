import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Group from "./group/pages/Group";
import Post from "./post/pages/Post";
import NewPost from "./post/pages/NewPost";

import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";
import MainNavigation from "./shared/components/Nav/MainNavigation";

import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Group groupId="5df10b93ace1b1037cf2f752" />
        </Route>

        <Route path="/me" exact>
          <h1>me</h1>
        </Route>

        <Route path="/groups" exact>
          <h1>groups</h1>
        </Route>
        <Route path="/newPost" exact>
          <NewPost />
        </Route>
        <Route path="/:groupId/:postId" exact>
          <Post />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Group groupId="5df10b93ace1b1037cf2f752" />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/groups" exact>
          <h1>groups</h1>
        </Route>
        {/* <Route path="/groups/:groupId" exact>
          <Group />
        </Route> */}
        <Route path="/:groupId/:postId" exact>
          <Post />
        </Route>
        <Redirect to="/signup" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
