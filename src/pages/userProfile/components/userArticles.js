import React, { Fragment, useEffect } from "react";
import { stringify } from "query-string";

import { getPaginator, limit } from "../../../utils";
import { useFetch } from "../../../hooks/useFetch";
import { Loading } from "../../../components/loading";
import { ErrorMessage } from "../../../components/errorMessage";
import { Feed } from "../../../components/feed";
import { Pagination } from "../../../components/pagination";

export const UserArticles = ({ location, username, isFavorites, url }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const getApiUrl = ({ username, isFavorites, offset }) => {
    const params = isFavorites
      ? { limit, offset, favorited: username }
      : { limit, offset, author: username };

    return `/articles?${stringify(params)}`;
  };
  const apiUrl = getApiUrl({ username, isFavorites, offset });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites]);

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && response && (
        <Fragment>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            currentPage={currentPage}
            limit={limit}
            url={url}
          />
        </Fragment>
      )}
    </div>
  );
};
