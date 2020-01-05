import { createContext } from "react";

export const AuthContext = createContext({
  isAdmin: null,
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
});
