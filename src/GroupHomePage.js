import React, { Component } from "react";

import NavBar from "./components/NavBar";

class GroupHomePage extends Component {
  state = {
    group: "",
    members: [],
    recipients: [],
  };

  componentDidMount() {
    const id = this.props.routerProps.match.params.id;
    fetch(`http://localhost:3001/api/v1/groups/${id}`)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          group: result.group,
          members: result.members,
          recipients: result.recipients,
        });
      });
  }

  render() {
    return (
      <div>
        <NavBar
          currentUser={this.props.currentUser}
          handleLogout={this.props.handleLogout}
          routerProps={this.props.routerProps}
        />
        This is the Group Home Page for {this.state.group.name}
        <div>
          Group Members:
          <ul>
            <li>{this.props.currentUser.name}</li>
            {this.state.members.map((member) => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>
        <div>
          Who we are giving a gift for:
          <ul>
            {this.state.recipients.map((recipient) => (
              <li key={recipient.id}>{recipient.name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default GroupHomePage;
