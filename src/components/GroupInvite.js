import React, { Component } from "react";

class GroupInvite extends Component {
  state = {
    userGroups: "",
    groups: "",
  };

  componentDidMount() {
    const user_id = this.props.currentUser.id;
    fetch(`http://localhost:3001/api/v1/invites/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          userGroups: data.filtered,
          groups: data.groups,
        });
      });
  }

  handleAccept = (event) => {
      let id = event.target.id
      let ID = parseInt(id) 
      const group = this.state.userGroups.filter(group => group.group_id === ID)
      let userGroupId = group[0].id

    fetch(`http://localhost:3001/api/v1/user_groups/${userGroupId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({status: 'accept'})
    })
    .then(response => response.json())
    .then(result => {
      console.log(result)
    })
  }

  handleDecline = (event) => {
      console.log(event.target.id)
      
  }

  render() {
    if (this.state.groups) {
      return (
        <div>
          <ul>
            {this.state.groups.map((group) => (
              <li key={group.id}>
                {group.name}
                <button onClick={this.handleAccept} id={group.id}>Accept</button>
                <button onClick={this.handleDecline} id={group.id}>Decline</button>
              </li>
            ))}
          </ul>
        </div>
      );
    } else return <div></div>;
  }
}

export default GroupInvite;
