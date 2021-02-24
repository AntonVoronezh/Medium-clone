import React, { useEffect, useState, useContext } from "react";

import { ArticleForm } from "../../components/article";
import { useFetch } from "../../hooks/useFetch";
import { Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUser";
import {IValue} from "../editArticle";

export const CreateArticle = (): JSX.Element => {
  const initialValues: IValue = {
    title: "",
    body: "",
    description: "",
    tagList: [],
  };
  const apiUrl: string = "/articles";
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [isSuccessfullSubmit, setIsSucsessfullSubmit] = useState<boolean>(false);
  const { state: currentUserState } = useContext(CurrentUserContext);

  const handleSubmit = (article: IValue): void => {
    doFetch({
      method: "post",
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    setIsSucsessfullSubmit(true);
  }, [response]);

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to={`/`} />;
  }

  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
