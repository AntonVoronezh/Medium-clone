import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Routes } from "./routes";
import { TopBar } from "./components/topBar";
import { CurrentUserProvider } from "./contexts/currentUser";
import { CurrentUserChecker } from "./components/currentUserChecker";

const App:React.FC = () =>  {
  return (
    <CurrentUserProvider className="App">
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
