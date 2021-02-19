import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { CurrentUserContext } from "../contexts/currentUser";

interface Props {
  tagName?: string;
}

export const FeedToggler: React.FC<Props> = ({ tagName }) => {
  const { state: currentUserState } = useContext(CurrentUserContext);

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {currentUserState.isLoggedIn && (
          <li className="nav-item">
            <NavLink to="/feed" className="nav-link">
              Your feed
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link">
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink exact to={`/tags/${tagName}`} className="nav-link">
              #{tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};
