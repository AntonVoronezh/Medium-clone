import React from "react";
import { Switch, Route } from "react-router-dom";

import GlobalFeed from "./pages/globalFeed";
import Article from "./pages/article";

export default () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact={true}/>
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};
