import React from "react";
import classNames from "classnames";

import { useFetch } from "../hooks/useFetch";

export const AddToFavorites = ({
  isFavorited,
  favoritesCount,
  articleSlug,
}) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;

  const isFavoritedWithResponse = response
    ? response.article.favorited
    : isFavorited;

  const buttonClasses = classNames({
    btn: true,
    "btn-small": true,
    "btn-primary": isFavoritedWithResponse,
    "btn-outline-primary": !isFavoritedWithResponse,
  });

  const handleLike = (e) => {
    e.preventDefault();

    doFetch({
      method: isFavoritedWithResponse ? "delete" : "post",
    });
  };

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <span>&nbsp; {favoritesCountWithResponse}</span>
    </button>
  );
};
