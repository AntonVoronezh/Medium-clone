import { stringify } from "query-string";
import React, { Fragment, useEffect } from "react";

import { useFetch } from "../../hooks/useFetch";
import { Feed } from "../../components/feed";
import { Pagination } from "../../components/pagination";
import {getPaginator, IPaginator, limit} from "../../utils";
import { PopularTags } from "../../components/popularTags";
import { Loading } from "../../components/loading";
import { ErrorMessage } from "../../components/errorMessage";
import { FeedToggler } from "../../components/feedToggler";

interface IProps {
  location: any;
  match: any;
}

export const TagFeed = ({ location, match }: IProps): JSX.Element => {
  const tagName: string = match.params.slug;
  const { offset, currentPage }: IPaginator = getPaginator(location);
  const stringParameters = stringify({ offset, limit, tag: tagName });
  const apiUrl: string = `/articles?${stringParameters}`;
  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, tagName]);

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
            <FeedToggler tagName={tagName} />
            {isLoading && <Loading />}
            {error && <ErrorMessage errors={[]}/>}
            {!isLoading && response && (
              <Fragment>
                <Feed articles={response.articles}></Feed>
                <Pagination
                  total={response.articlesCount}
                  url={match.url}
                  currentPage={currentPage}
                  limit={limit}
                />
              </Fragment>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};
