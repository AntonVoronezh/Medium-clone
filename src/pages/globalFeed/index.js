import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Feed } from "../../components/feed";

export const GlobalFeed = () => {
  const apiUrl = "/articles?limit=10&offset=0";
  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl);
  console.log(response);
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {isLoading && "Loading"}
            {error && "Some error"}
            {!isLoading && response && (
              <Feed articles={response.articles}></Feed>
            )}
          </div>
          <div className="col-md-3">popular tags</div>
        </div>
      </div>
    </div>
  );
};
