import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import TopBar from "./components/topBar";
import { CurrentUserProvider } from "./contexts/currentUser";

function App() {
  return (
    <CurrentUserProvider className="App">
      <Router>
        <TopBar />
        <Routes />
      </Router>
    </CurrentUserProvider>
  );
}

export default App;
