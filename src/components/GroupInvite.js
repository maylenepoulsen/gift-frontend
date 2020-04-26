import React, { Component } from "react";

class GroupInvite extends Component {
  state = {
    userGroups: "",
    groups: "",
  };

  handleClickAccept = event => {
    let id = event.target.id;
    let ID = parseInt(id);
    this.props.handleAccept(ID)
  }

  handleClickDecline = event => {
    let id = event.target.id
    let ID = parseInt(id)
    this.props.handleDecline(ID)
  }

  render() {
    if (this.props.groupsPending) {
      return (
        <div>
          <ul>
            {this.props.groupsPending.map((group) => (
              <li key={group.id}>
                {group.name}
                <button onClick={this.handleClickAccept} id={group.id}>Accept</button>
                <button onClick={this.handleClickDecline} id={group.id}>Decline</button>
              </li>
            ))}
          </ul>
        </div>
      );
    } else return <div></div>;
  }
}

export default GroupInvite;
