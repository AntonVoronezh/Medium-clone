import React from "react";

import { ArticleForm } from "../../components/article";

export const CreateArticle = () => {
  const errors = {};
  const initialValues = {};
  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <ArticleForm
        errors={errors}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
