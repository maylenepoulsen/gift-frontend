import React, { Component } from "react";

class StartGroup extends Component {
  state = {
    name: "",
    eventName: "",
    newMember: "",
    members: [],
    admin_user_id: "",
  };

  componentDidMount() {
    this.setState({
      admin_user_id: this.props.currentUser.id,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSelectDropDown = (event) => {
    this.setState({
        eventName: event.target.value
    })
  }

  handleAddMember = (event) => {
    event.preventDefault();
    const newMember = this.state.newMember;

    this.setState({
      members: [...this.state.members, newMember],
      newMember: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const group = {
      name: this.state.name,
      members: this.state.members,
      event_name: this.state.eventName,
      admin_user_id: this.state.admin_user_id,
    };

    fetch("http://localhost:3001/api/v1/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(group),
    })
    .then(response => response.json())
    .then(result => {
      this.props.routerProps.history.push(`/add-recipient/group/${result.id}`)
    })
    ;
  };

  render() {
    return (
      <div>
        <form>
          <label>
            Enter a name for your new Group:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Select an Event Type this group will be participating in:
            <select onChange={this.handleSelectDropDown}>
                <option value='Birthdays'>Birthdays</option>
                <option value='Baby Shower'>Baby Shower</option>
                <option value='Holiday'>Holiday</option>
                <option value='Wedding'>Wedding</option>
                <option value='Graduation'>Graduation</option>
                <option value='Classroom/School'>Classroom/School</option>
                <option value='Other Special Occasion'>Other Special Occasion</option>
            </select>
          </label>
          <div>
            <div>
              <ul>
                {this.state.members.map((member, idx) => (
                  <li key={idx}>{member}</li>
                ))}
              </ul>
            </div>
            <label>
              Add members to your group:
              <input
                type="text"
                name="newMember"
                value={this.state.newMember}
                onChange={this.handleChange}
              />
            </label>
            <button onClick={this.handleAddMember}>Add to group</button>
          </div>
          <button onClick={this.handleSubmit}>Create Group</button>
        </form>
      </div>
    );
  }
}

export default StartGroup;
