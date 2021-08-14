import Sidebar from "./components/Sidebar";
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import OrgSignUp from "./pages/OrgSignUp";

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
          <Route exact path="/org/setup">
            <OrgSignUp/>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
