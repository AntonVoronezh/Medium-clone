import React from "react";
import classNames from "classnames";

import { useFetch } from "../hooks/useFetch";

interface IProps {
  isFavorited: boolean;
  favoritesCount: number;
  articleSlug: string;
}

export const AddToFavorites = ({
  isFavorited,
  favoritesCount,
  articleSlug,
}: IProps): JSX.Element => {
  const apiUrl: string = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const favoritesCountWithResponse: number = response
    ? response.article.favoritesCount
    : favoritesCount;

  const isFavoritedWithResponse: boolean = response
    ? response.article.favorited
    : isFavorited;

  const buttonClasses: string = classNames({
    btn: true,
    "btn-small": true,
    "btn-primary": isFavoritedWithResponse,
    "btn-outline-primary": !isFavoritedWithResponse,
  });

  const handleLike = (e: React.SyntheticEvent<EventTarget>): void => {
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
