import React from "react";
import { Switch, Route } from "react-router-dom";

import { GlobalFeed } from "./pages/globalFeed";
import { TagFeed } from "./pages/tagFeed";
import { Article } from "./pages/article";
import Authentication from "./pages/authentiсation";
import { YourFeed } from "./pages/yourFeed";
import { CreateArticle } from "./pages/createArticle";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={YourFeed} exact={true} />
      <Route path="/feed" component={GlobalFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/articles/:slug" component={Article} />
      <Route path="/article/new" component={CreateArticle} />
      <Route path="/login" component={Authentication} exact={true} />
      <Route path="/register" component={Authentication} exact={true} />
    </Switch>
  );
};
