import React, { Fragment, useEffect } from "react";
import { stringify } from "query-string";

import { getPaginator, IPaginator, limit } from "../../../utils";
import { useFetch } from "../../../hooks/useFetch";
import { Loading } from "../../../components/loading";
import { Feed } from "../../../components/feed";
import { Pagination } from "../../../components/pagination";

interface IProps {
  location: any;
  username: string;
  isFavorites: boolean;
  url: string;
}

interface IApi {
  username: string;
  isFavorites: boolean;
  offset: number;
}

export const UserArticles = ({
  location,
  username,
  isFavorites,
  url,
}: IProps): JSX.Element => {
  const { offset, currentPage }: IPaginator = getPaginator(location.search);
  const getApiUrl = ({ username, isFavorites, offset }: IApi): string => {
    const params = isFavorites
      ? { limit, offset, favorited: username }
      : { limit, offset, author: username };

    return `/articles?${stringify(params)}`;
  };
  const apiUrl: string = getApiUrl({ username, isFavorites, offset });
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
