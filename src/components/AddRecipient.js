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
    fetch(`http://localhost:3001/api/v1/groups/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
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

    fetch("http://localhost:3001/api/v1/recipients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(recipients),
    })
      .then((response) => response.json())
      .then(
        this.props.routerProps.history.push(`/groups/${this.state.group.id}`)
      );
  };

  render() {
    return (
      <div>
        <NavBar
          currentUser={this.props.currentUser}
          handleLogout={this.props.handleLogout}
          routerProps={this.props.routerProps}
        />
        <div className='add-recipient-group-name'>Group: {this.state.group.name}</div>
        {this.state.recipients.length > 0 ? (
          this.state.recipients.map((recipient, idx) => (
            <div key={idx} className='added-recipient'>
              <p className='name'>{recipient.recipient}</p>
              <p className='date'>{recipient.eventDate}</p>
              <p className='relationship'>{recipient.relationship}</p>
              <p className='budget'>{recipient.budget}</p>
              <p className='interests'>{recipient.interests}</p>
              <p className='notes'>{recipient.notes}</p>
            </div>
          ))
        ) : (
          <div></div>
        )}
        <div className='form-recipient'>
          <form>
            <label className='who'>
              Who is this gift for?
              <input
                type="text"
                className='who'
                name="recipient"
                value={this.state.recipient}
                onChange={this.handleChange}
              />
            </label>
            <label className='date'>
              Enter a date of the event
              <input
                type="text"
                className='date'
                name="eventDate"
                value={this.state.eventDate}
                onChange={this.handleChange}
              />
            </label>
            <label className='related'>
              How is this recipient related to your group?
              <input
                type="text"
                className='related'
                name="relationship"
                value={this.state.relationship}
                onChange={this.handleChange}
              />
            </label>
            <label className='budget'>
              Budget for group gift
              <input
                type="number"
                className='budget'
                name="budget"
                value={this.state.budget}
                onChange={this.handleChange}
              />
            </label>
            <label className='hobbies'>
              List any special interests or hobbies this person has
              <textarea
                name="interests"
                className='hobbies'
                value={this.state.interests}
                onChange={this.handleChange}
              />
            </label>
            <label className='add-recipient-notes'>
              Notes
              <textarea
                name="notes"
                className='add-recipient-notes'
                value={this.state.notes}
                onChange={this.handleChange}
              />
            </label>
          </form>
          <button onClick={this.handleAddAnotherRecipient} className='add-another'>
            Add another recipient
          </button>
          <button onClick={this.handleSubmitRecipients} className='submit-recipient'>
            Add Recipient(s) to Group
          </button>
        </div>
      </div>
    );
  }
}

export default AddRecipient;
