import Sidebar from "./components/Sidebar";
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import OrgSignUp from "./pages/OrgSignUp";
import Setup from "./pages/org/Setup";
import Profile from "./pages/org/Profile";
import OrgRegister from "./pages/OrgRegister";
import PostJob from "./pages/org/PostJob";

function App() {
  return (
    <Router>
      <div>
       
        
        <Switch>
         
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/sign-up-org">
            <OrgSignUp/>
          </Route>
          <Route exact path="/post-job">
            <PostJob/>
          </Route>

          <Route exact path="/org-login">
            <OrgRegister/>
          </Route>
          <Route exact path="/org/setup">
            <Setup  />
          </Route>

          <Route exact path="/profile/:username">
            <Profile  />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
