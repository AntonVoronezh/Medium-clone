import React from "react";
import { NavLink } from "react-router-dom";

export const FeedTogler = ({ tagName }) => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink to="/feed" className="nav-link">
            Your feed
          </NavLink>
        </li>
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
