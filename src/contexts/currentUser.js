import React, { createContext, useReducer } from "react";

const initialsState = {
  isLoading: false,
  isLoggedIn: null,
  currentUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "SET_AUTHORIZED":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload,
      };
    case "SET_UNAUTHORIZED":
      return { ...state, isLoggedIn: false };
    case "LOGOUT":
      return { ...initialsState, isLoggedIn: false };
    default:
      return state;
  }
};

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const value = useReducer(reducer, initialsState);
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};
