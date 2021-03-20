import React from "react";
import ReactDOM from "react-dom";

//import "./index.css";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Home />
  </Router>,
  document.getElementById("root")
);
