import React, { Component } from "react";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      eventName: event.target.value,
    });
  };

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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(group),
    })
      .then((response) => response.json())
      .then((result) => {
        this.props.routerProps.history.push(
          `/add-recipient/group/${result.id}`
        );
      });
  };

  render() {
    return (
      <div>
         <div className='directions'><span>
            <FontAwesomeIcon icon={faGift} style={{ color: "#3e6b89", marginRight: '10px'}} />
          </span>Once you have added members to your group, you can click to add one or more recipients to give a group gift to.</div>
        <form>
          <label className="enter-name">
            Enter a name for your new Group
            <input
              type="text"
              className="group-name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label className="select-event">
            Select an Event type for this Group
            <select onChange={this.handleSelectDropDown} className="dropdown">
              <option value="Birthdays">Birthdays</option>
              <option value="Baby Shower">Baby Shower</option>
              <option value="Holiday">Holiday</option>
              <option value="Wedding">Wedding</option>
              <option value="Graduation">Graduation</option>
              <option value="Classroom/School">Classroom/School</option>
              <option value="Other Special Occasion">
                Other Special Occasion
              </option>
            </select>
          </label>
          <div>
            <div>
              <ul className='create-group'>
                {this.state.members.map((member, idx) => (
                  <li key={idx}>{member}</li>
                ))}
              </ul>
            </div>
            <label className='add-members'>
              Add members to your group
              <input
                type="text"
                className='group-member'
                name="newMember"
                value={this.state.newMember}
                onChange={this.handleChange}
              />
            </label>
            <button className='add-btn' onClick={this.handleAddMember}>Add to group</button>
          </div>
          <button className='create-group-btn' onClick={this.handleSubmit}>Add A Recipient</button>
        </form>
        <div className="create-page-gift">
            <img src="../christmas-presents.png" alt="gift-icon" width={130} />
          </div>
      </div>
    );
  }
}

export default StartGroup;
