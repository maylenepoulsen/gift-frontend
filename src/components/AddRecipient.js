import React, { Component } from "react";
import NavBar from "./NavBar";

class AddRecipient extends Component {
  state = {
    recipient: "",
    eventDate: "",
    relationship: "",
    budget: "",
    interests: "",
    notes: "",
    group: "",
    recipients: [],
  };

  componentDidMount() {
    const id = this.props.routerProps.match.params.id;
    fetch(`http://localhost:3001/api/v1/groups/${id}`)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          group: result.group,
        });
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAddAnotherRecipient = () => {
    const person = {
      recipient: this.state.recipient,
      eventDate: this.state.eventDate,
      relationship: this.state.relationship,
      budget: this.state.budget,
      interests: this.state.interests,
      notes: this.state.notes,
      group_id: this.state.group.id,
    };

    this.setState({
      recipient: "",
      eventDate: "",
      relationship: "",
      budget: "",
      interests: "",
      notes: "",
      recipients: [...this.state.recipients, person],
    });
  };

  handleSubmitRecipients = () => {
    const person = {
      recipient: this.state.recipient,
      eventDate: this.state.eventDate,
      relationship: this.state.relationship,
      budget: this.state.budget,
      interests: this.state.interests,
      notes: this.state.notes,
      group_id: this.state.group.id,
    };

    this.setState({
      recipients: [...this.state.recipients, person],
    });

    const recipients = {
      group: this.state.group,
      recipients: [...this.state.recipients, person],
    };

    fetch('http://localhost:3001/api/v1/recipients', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(recipients),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        this.props.routerProps.history.push(`/groups/${this.state.group.id}`)
      });
  };

  render() {
    return (
      <div>
        <NavBar
          currentUser={this.props.currentUser}
          handleLogout={this.props.handleLogout}
          routerProps={this.props.routerProps}
        />
        <div>Group: {this.state.group.name}</div>
        {this.state.recipients.length > 0 ? (
          this.state.recipients.map((recipient, idx) => (
            <div key={idx}>
              <p>{recipient.recipient}</p>
              <p>{recipient.eventDate}</p>
              <p>{recipient.relationship}</p>
              <p>{recipient.budget}</p>
              <p>{recipient.interests}</p>
              <p>{recipient.notes}</p>
            </div>
          ))
        ) : (
          <div></div>
        )}
        <form>
          <label>
            Who is this gift for?
            <input
              type="text"
              name="recipient"
              value={this.state.recipient}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Enter a date of the event
            <input
              type="text"
              name="eventDate"
              value={this.state.eventDate}
              onChange={this.handleChange}
            />
          </label>
          <label>
            How is this recipient related to your group?
            <input
              type="text"
              name="relationship"
              value={this.state.relationship}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Budget for group gift
            <input
              type="number"
              name="budget"
              value={this.state.budget}
              onChange={this.handleChange}
            />
          </label>
          <label>
            List any special interests or hobbies this person has
            <textarea
              name="interests"
              value={this.state.interests}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Notes
            <textarea
              name="notes"
              value={this.state.notes}
              onChange={this.handleChange}
            />
          </label>
        </form>
        <button onClick={this.handleAddAnotherRecipient}>
          Add another recipient
        </button>
        <button onClick={this.handleSubmitRecipients}>
          Add Recipient(s) to Group
        </button>
      </div>
    );
  }
}

export default AddRecipient;
