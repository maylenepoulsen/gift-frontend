import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import GroupInvite from "./components/GroupInvite";
import GroupsUserBelongsTo from "./components/GroupsUserBelongsTo";

class UserHomePage extends Component {
  state = {
    userGroups: [],
    groupsPending: [],
    groupsAccept: [],
    groupsAdmin: [],
  };

  componentDidMount() {
    const user_id = this.props.currentUser.id;
    fetch(`http://localhost:3001/api/v1/invites/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          userGroups: data.filtered,
          groupsPending: data.groups,
          groupsAccept: data.accept,
          groupsAdmin: data.admin_groups
        });
      });
  }

  handleAccept = (id) => {
    const group = this.state.userGroups.filter(
      (group) => group.group_id === id
    );
    let userGroupId = group[0].id;

    fetch(`http://localhost:3001/api/v1/user_groups/${userGroupId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: "accept" }),
    })
      .then((response) => response.json())
      .then((result) => {

        const newPending = this.state.groupsPending.filter(group => group.id !== result.group_id)
        const newAccept = this.state.groupsPending.find(group => group.id === result.group_id)

        this.setState({
          groupsPending: [...newPending],
          groupsAccept: [...this.state.groupsAccept, newAccept]
        })
      });
  };

  handleDecline = (id) => {  
    const group = this.state.userGroups.find((group) => group.group_id === id);
    const userGroupIdToDelete = group.id

    fetch(`http://localhost:3001/api/v1/user_groups/${userGroupIdToDelete}`, {
      method: 'DELETE'
    })
    
    const newPending = this.state.groupsPending.filter(group => group.id !== id)
    this.setState({
     groupsPending: [...newPending]
    })   
}

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
            <GroupInvite
              currentUser={this.props.currentUser}
              groupsPending={this.state.groupsPending}
              handleAccept={this.handleAccept}
              handleDecline={this.handleDecline}
            />
          </span>
          <span>
            Groups User Belongs to:
            <GroupsUserBelongsTo
              currentUser={this.props.currentUser}
              groupsAccept={this.state.groupsAccept}
              groupsAdmin={this.state.groupsAdmin}
              routerProps={this.props.routerProps}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default UserHomePage;
