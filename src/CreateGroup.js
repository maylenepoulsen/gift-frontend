import React, { Component } from "react";
import StartGroup from "./components/StartGroup";
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
        <div className='create-group-title'>Create A Group</div>
        <div>
          <StartGroup
            currentUser={this.props.currentUser}
            routerProps={this.props.routerProps}
          />
        </div>
      </div>
    );
  }
}

export default CreateGroup;
