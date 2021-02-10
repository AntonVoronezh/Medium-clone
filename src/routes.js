import React from "react";
import { Switch, Route } from "react-router-dom";

import { GlobalFeed } from "./pages/globalFeed";
import { TagFeed } from "./pages/tagFeed";
import Article from "./pages/article";
import Authentication from "./pages/authentiсation";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact={true}/>
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/articles/:slug" component={Article} />
      <Route path="/login" component={Authentication} exact={true}/>
      <Route path="/register" component={Authentication} exact={true}/>
    </Switch>
  );
};
