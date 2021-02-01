import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import TopBar from "./components/topBar";

function App() {
  return (
    <div className="App">
      <Router>
      <TopBar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
