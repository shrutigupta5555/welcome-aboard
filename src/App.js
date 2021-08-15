import Sidebar from "./components/Sidebar";
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import OrgSignUp from "./pages/OrgSignUp";
import Setup from "./pages/org/Setup";
import Profile from "./pages/org/Profile";
import OrgRegister from "./pages/OrgRegister";
import PostJob from "./pages/org/PostJob";
import SingleJob from "./pages/org/SingleJob";
import Portfolio from "./pages/user/Portfolio";
import UserSignUp from "./pages/UserSignUp";
import UserRegister from "./pages/UserRegister";
import PortfolioSetUp from "./pages/user/PortfolioSetUp";
import JobColl from "./pages/JobColl";

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
          <Route exact path="/signup-user">
            <UserSignUp/>
          </Route>
          <Route exact path="/post-job">
            <PostJob/>
          </Route>

          <Route exact path="/org-login">
            <OrgRegister/>
          </Route>
          <Route exact path="/user-login">
            <UserRegister/>
          </Route>
          <Route exact path="/org/setup">
            <Setup  />
          </Route>

          <Route exact path="/user/setup">
            <PortfolioSetUp  />
          </Route>
          

          <Route exact path="/profile/:username">
            <Profile  />
          </Route>
          <Route exact path="/job-details/:jobid">
            <SingleJob  />
          </Route>

          <Route exact path="/browse-jobs">
            <JobColl  />
          </Route>

          <Route exact path="/user/profile-user/:username">
            <Portfolio  />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
