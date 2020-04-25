import React, { Component } from "react";

class AddRecipient extends Component {
  state = {
    recipient: "",
    eventDate: "",
    relationship: '',
    budget: '',
    interests: '',
    notes: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default AddRecipient;
