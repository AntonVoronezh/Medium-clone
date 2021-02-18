import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import { ArticleForm } from "../../components/article";
import { CurrentUserContext } from "../../contexts/currentUser";

export const EditArticle = ({ match }) => {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfullSubmit, setIsSucsessfullSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const handleSubmit = (article) => {
    doUpdateArticle({
      method: "put",
      data: { article },
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    setInitialValues({
      title: fetchArticleResponse.article.title,
      body: fetchArticleResponse.article.body,
      description: fetchArticleResponse.article.description,
      tagList: fetchArticleResponse.article.tagList,
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }

    setIsSucsessfullSubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to={`/`} />;
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${slug}`} />;
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  );
};
