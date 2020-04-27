import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./HomePage";
import UserHomePage from "./UserHomePage";
import CreateGroup from "./CreateGroup";
import GroupHomePage from './GroupHomePage';

class App extends Component {
  state = {
    auth: { currentUser: {} },
  };

  handleLogin = (user) => {
    const currentUser = { currentUser: user };
    this.setState({ auth: currentUser });
  };

  handleLogout = () => {
    this.setState({ auth: { currentUser: {} } });
    localStorage.clear()
  };

  render() {
    return (
      <div>
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
        {this.state.auth.currentUser.id ? (
          <Switch>
            <Route
              path={`/users/${this.state.auth.currentUser.id}`}
              render={(routerProps) => {
                return (
                  <UserHomePage
                    currentUser={this.state.auth.currentUser}
                    handleLogout={this.handleLogout}
                    routerProps={routerProps}
                  />
                );
              }}
            />
            <Route
              path="/create-group"
              render={(routerProps) => {
                return (
                  <CreateGroup
                    currentUser={this.state.auth.currentUser}
                    handleLogout={this.handleLogout}
                    routerProps={routerProps}
                  />
                );
              }}
            />
            <Route
              exact path='/groups/:id'
              render={(routerProps) => {
                return (
                  <GroupHomePage 
                    currentUser={this.state.auth.currentUser}
                    handleLogout={this.handleLogout}
                    routerProps={routerProps}
                  />
                )
              }}
            />
          </Switch>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

export default App;
