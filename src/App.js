import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import UserHomePage from "./UserHomePage";

class App extends Component {
  state = {
    auth: { currentUser: {} },
  };

  handleLogin = (user) => {
    const currentUser = { currentUser: user };
    this.setState({ auth: currentUser });
  };

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(routerProps) => {
              return (
                <HomePage
                  handleLogin={this.handleLogin}
                  routerProps={routerProps}
                />
              );
            }}
          />
          <Route
          path={`/users/${this.state.auth.currentUser.id}`}
          render={() => {
            return <UserHomePage />
          }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
