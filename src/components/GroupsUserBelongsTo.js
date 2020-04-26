import React, { Component } from "react";

class GroupsUserBelongsTo extends Component {
  render() {
    if (this.props.groupsAccept) {
      return (
        <div>
          <ul>
            {this.props.groupsAccept.map((group) => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul>
        </div>
      );
    } else return <div></div>;
  }
}

export default GroupsUserBelongsTo;
