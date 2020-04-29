import React, { Component } from "react";
import SignUp from "./components/authorization/SignUp";
import Login from "./components/authorization/Login";

class HomePage extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="welcome">Welcome to Group Gift</div>
          <div className="giving">
            Giving a Group Gift has never been easier!
          </div>
          <ul className='home-ul'>
            <li className='login-li'>
              <Login
                handleLogin={this.props.handleLogin}
                routerProps={this.props.routerProps}
              />
            </li>
            <li className='signup-li'>
              <SignUp
                handleLogin={this.props.handleLogin}
                routerProps={this.props.routerProps}
              />
            </li>
          </ul>
        </header>
        <div className="background"><div className='how-it-works'></div></div>
        <footer>Footer</footer>
      </div>
    );
  }
}

export default HomePage;
