import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import GroupInvite from './components/GroupInvite';
import GroupsUserBelongsTo from './components/GroupsUserBelongsTo';

class UserHomePage extends Component {
  render() {
     
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
        <div>
          <span>
          Invites to Groups:
          <GroupInvite currentUser={this.props.currentUser}/>
          </span>
          <span>
            Groups User Belongs to:
          <GroupsUserBelongsTo currentUser={this.props.currentUser}/>
          </span>
        </div>
      </div>
    );
  }
}

export default UserHomePage;
