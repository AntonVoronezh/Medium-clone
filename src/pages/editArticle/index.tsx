import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import { ArticleForm } from "../../components/article";
import { CurrentUserContext } from "../../contexts/currentUser";

export interface IValue {
  title: string;
  body: string;
  description: string;
  tagList: string[];
}

interface IProps {
  match: any;
}

export const EditArticle: ({ match }: IProps) => JSX.Element = ({
  match,
}: IProps) => {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState<IValue | null>(null);
  const [isSuccessfullySubmit, setIsSuccessfullySubmit] = useState(false);
  const { state: currentUserState } = useContext(CurrentUserContext);

  const handleSubmit = (article: IValue): void => {
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

    setIsSuccessfullySubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to={`/`} />;
  }

  if (isSuccessfullySubmit) {
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
