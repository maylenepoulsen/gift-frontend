import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from './HomePage';
import CreateGroup from './CreateGroup';

class App extends Component {
  render() {
    return (
    <div>
     <Switch>
       <Route path='/home-page'>
         <HomePage />
       </Route>
       <Route>
         <CreateGroup path='./create-group'/>
       </Route>
     </Switch>
    </div>
    )
  }
}

export default App;