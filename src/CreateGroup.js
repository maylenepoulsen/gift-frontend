import React, { Component } from "react";
import StartGroup from './components/StartGroup';
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
         <StartGroup currentUser={this.props.currentUser}/>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
