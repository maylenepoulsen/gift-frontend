import React, { Component } from "react";
import AddRecipient from "./components/AddRecipient";
import NavBar from "./components/NavBar";

class CreateGroup extends Component {
  render() {
    return (
      <div>
        <NavBar 
        currentUser={this.props.currentUser}
        handleLogout={this.props.handleLogout}
        routerProps={this.props.routerProps}
        />
        <h2>This is the Page to Create A Group</h2>
        <div>
          <AddRecipient />
        </div>
      </div>
    );
  }
}

export default CreateGroup;
