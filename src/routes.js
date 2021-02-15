import React from "react";
import { Switch, Route } from "react-router-dom";

import { GlobalFeed } from "./pages/globalFeed";
import { TagFeed } from "./pages/tagFeed";
import { Article } from "./pages/article";
import Authentication from "./pages/authentiсation";
import { YourFeed } from "./pages/yourFeed";
import { CreateArticle } from "./pages/createArticle";
import { EditArticle } from "./pages/editArticle";
import { Settings } from "./pages/settings";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={YourFeed} exact={true} />
      <Route path="/settings" component={Settings} />
      <Route path="/feed" component={GlobalFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/articles/new" component={CreateArticle} />
      <Route path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/articles/:slug" component={Article} />
      <Route path="/login" component={Authentication} exact={true} />
      <Route path="/register" component={Authentication} exact={true} />
    </Switch>
  );
};
