import React, { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { Loading } from "./loading";
import { ErrorMessage } from "./errorMessage";
import { Link } from "react-router-dom";

export const PopularTags = () => {
  const [{ isLoading, response, error }, doFetch] = useFetch("/tags");

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <div className="tag-list">
        {response.tags
          .map((tag) => {
            return (
              <Link
                to={`/tags/${tag}`}
                key={tag}
                className="tag-pill tag-default"
              >
                {tag}
              </Link>
            );
          })}
      </div>
    </div>
  );
};
