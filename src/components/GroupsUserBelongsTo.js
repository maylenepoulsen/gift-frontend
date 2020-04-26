import React, { Component } from "react";

class GroupsUserBelongsTo extends Component {
  state = {
    groups: "",
  };

  componentDidMount() {
    const user_id = this.props.currentUser.id;
    fetch(`http://localhost:3001/api/v1/belongs/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          groups: data,
        });
      });
  }

  render() {
    if (this.state.groups) {
      return (
        <div>
          <ul>
            {this.state.groups.map((group) => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul>
        </div>
      );
    } else return <div></div>;
  }
}

export default GroupsUserBelongsTo;
