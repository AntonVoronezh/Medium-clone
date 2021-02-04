import React, { useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { CurrentUserContext } from "../contexts/currentUser";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch("/user");
  const [, setCurrentUser] = useContext(CurrentUserContext);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (!token) {
      setCurrentUser((state) => ({
        ...state,
        isLoggedIn: false,
      }));

      return;
    }

    doFetch();
    setCurrentUser((state) => ({
      ...state,
      isLoading: true,
    }));
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }

    setCurrentUser((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }));
  }, [response, setCurrentUser]);

  return children;
};

export default CurrentUserChecker;
