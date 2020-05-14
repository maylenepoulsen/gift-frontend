import React, { Component } from "react";
import { Link } from "react-router-dom";

class GroupsUserBelongsTo extends Component {
  render() {
    if (this.props.groupsAccept  && this.props.groupsAdmin) {
      return (
        <div>
          <div>
            <ul className='group-invite'>
              {this.props.groupsAccept.map((group) => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <li key={group.id} id={group.id}>
                    {group.name}
                  </li>
                </Link>
              ))}
            </ul>
            <ul className='group-invite'>
              {this.props.groupsAdmin.map((group) => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <li key={group.id} id={group.id}>
                    {group.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      );
    } else return <div></div>;
  }
}

export default GroupsUserBelongsTo;
