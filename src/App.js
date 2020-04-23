import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from './HomePage';
import CreateGroup from './CreateGroup';

class App extends Component {
  state = {
    auth: {currentUser: {}}
  }

  handleLogin = (user) => {
    const currentUser = {currentUser: user}
    this.setState({auth: currentUser})
  }

  render() {
    return (
    <div>
     <Switch>
       <Route path='/home-page'>
         <HomePage handleLogin={this.handleLogin}/>
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