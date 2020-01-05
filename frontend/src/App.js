import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Group from "./group/pages/Group";
import MainPage from "./group/pages/MainPage";
import AllGroups from "./group/pages/AllGroups";
import NewGroup from "./group/pages/NewGroup";
import Post from "./post/pages/Post";
import NewPost from "./post/pages/NewPost";
import UpdatePost from "./post/pages/UpdatePost";
import NewComment from "./comments/pages/NewComment";
import UpdateComment from "./comments/pages/UpdateComment";
import ForgotPassword from "./user/pages/ForgotPassword";
import Profile from "./user/pages/Profile";
import UpdateUserData from "./user/pages/UpdateUserData";
import ResetPassword from "./user/pages/ResetPassword";
import Admin from "./admin/pages/Admin";
import NewPassword from "./user/pages/NewPassword";
import AddDog from "./user/pages/AddDog";

import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";
import MainNavigation from "./shared/components/Nav/MainNavigation";

import { AuthContext } from "./shared/context/auth-context";

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);

  const login = useCallback((uid, token, role = "user", expirationDate) => {
    if (role === "admin" || role === "moderator") setIsAdmin(role);

    // console.log(isAdmin, role);
    setUserId(uid);
    setToken(token);

    // const administration = role || "user";
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        isAdmin: role,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setIsAdmin(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    // console.log("from app" + storedData.isAdmin);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.isAdmin,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>

        <Route path="/me" exact>
          <Profile />
        </Route>
        <Route path="/admin" exact>
          <Admin />
        </Route>

        <Route path="/groups" exact>
          <AllGroups />
        </Route>
        <Route path="/groups/newGroup" exact>
          <NewGroup />
        </Route>
        <Route path="/users/updateUserData" exact>
          <UpdateUserData />
        </Route>
        <Route path="/users/me/addDog" exact>
          <AddDog />
        </Route>
        <Route path="/users/me/changePassword" exact>
          <NewPassword />
        </Route>
        <Route path="/posts/update/:postId" exact>
          <UpdatePost />
        </Route>
        <Route path="/comments/update/:commentId" exact>
          <UpdateComment />
        </Route>

        <Route path="/groups/:groupId" exact>
          <Group />
        </Route>
        <Route path="/:groupId/:postId" exact>
          <Post />
        </Route>
        <Route path="/groups/:groupId/posts" exact>
          <NewPost />
        </Route>
        <Route path="/groups/:groupId/posts/:postId/comments" exact>
          <NewComment />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/groups" exact>
          <AllGroups />
        </Route>
        <Route path="/users/forgotPassword" exact>
          <ForgotPassword />
        </Route>
        <Route path="/users/resetPassword/:token" exact>
          <ResetPassword />
        </Route>
        <Route path="/groups/:groupId" exact>
          <Group />
        </Route>
        <Route path="/:groupId/:postId" exact>
          <Post />
        </Route>
        <Route path="/groups/:groupId/posts" exact>
          <NewPost />
        </Route>
        <Redirect to="/signup" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        isAdmin: isAdmin,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
