import React, { useEffect, useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import { Loading } from "../../components/loading";
import { ErrorMessage } from "../../components/errorMessage";
import { TagList } from "../../components/tagList";
import { CurrentUserContext } from "../../contexts/currentUser";

interface IProps {
  match: any;
}

export const Article = (props: IProps): JSX.Element => {
  const slug = props.match.params.slug;
  const apiUrl: string = `/articles/${slug}`;
  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl);
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(
    apiUrl
  );
  const { state: currentUserState } = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSucsessfullDelete] = useState(false);

  const isAuthor = (): boolean => {
    if (!response || !currentUserState.isLoggedIn) {
      return false;
    }

    return (
      response.article.author.username === currentUserState.currentUser.username
    );
  };

  const deleteArticle = (): void => {
    doDeleteArticle({ method: "delete" });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) {
      return;
    }

    setIsSucsessfullDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfullDelete) {
    return <Redirect to={`/`} />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!isLoading && response && (
          <div className="container">
            <h1>{response.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${response.article.author.username}`}>
                <img src={response.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${response.article.author.username}`}>
                  {response.article.author.username}
                </Link>
                <span className="date">{response.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    to={`/articles/${response.article.slug}/edit`}
                  >
                    Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {isLoading && <Loading />}
        {error && <ErrorMessage errors={error} />}
        {!isLoading && response && (
          <div className="article-content row">
            <div className="col-xs-12">
              <div>
                <p>{response.article.body}</p>
              </div>
              <TagList tags={response.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
