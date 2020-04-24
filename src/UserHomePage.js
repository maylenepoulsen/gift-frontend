import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";

class UserHomePage extends Component {
  render() {
      console.log(this.props.currentUser)
    return (
      <div>
        <NavBar 
        currentUser={this.props.currentUser}
        handleLogout={this.props.handleLogout}
        routerProps={this.props.routerProps}
        />
        This is the Users Home Page
        <Link to="/create-group">
          <button>Create a New Group</button>
        </Link>
      </div>
    );
  }
}

export default UserHomePage;
