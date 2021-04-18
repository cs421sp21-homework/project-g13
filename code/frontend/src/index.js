import React from "react";
import ReactDOM from "react-dom";

//import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Group from './pages/Group';
import Individual from "./pages/Individual";
import SetFilters from "./pages/SetFilters.js"
import AppNavbar from "./components/NavBar.js";
import LoginForm from "./components/LoginSignup/LoginForm";
import SignupForm from "./components/LoginSignup/SignupForm";
import Account from "./pages/Account";

ReactDOM.render(
  <Router>
      <div>
          <AppNavbar></AppNavbar>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/Join">
                    <div>
                    <Group isHost={false} />
                    </div>
                    
                </Route>
                <Route path="/Host">
                    <Group isHost={true} />
                </Route>
                <Route path="/Signup">
                    <Signup/>
                </Route>
                <Route path="/Login">
                    <Login/>
                </Route>
                <Route path="/Individual">
                    <Individual />
                </Route>
                <Route path="/Filter">
                    <SetFilters />
                </Route>
                <Route path="/Login">
                    <LoginForm/>
                </Route>
                <Route path="/Signup">
                    <SignupForm/>
                </Route>
                <Route path="/Account">
                    <Account/>
                </Route>
            </Switch>
        </div>
  </Router>,
  document.getElementById("root")
);
