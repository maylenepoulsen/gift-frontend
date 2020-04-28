import React, { Component } from "react";

class AddGift extends Component {
  state = {
    name: "",
    price: "",
    description: "",
    link: "",
    notes: "",
    recipient: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAddGift = () => {
    const gift = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      link: this.state.link,
      notes: this.state.notes,
      recipient_id: this.state.recipient,
    };

    this.props.addGiftToGiftIdeas(gift)

    fetch("http://localhost:3001/api/v1/gifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(gift),
    }).then(
      this.setState({
        name: "",
        price: "",
        description: "",
        link: "",
        notes: "",
        recipient: "",
      })
    );
  };

  render() {
    return (
      <div>
        <div>
          Choose a recipient:
          {this.props.recipients.map((recipient) => (
            <label key={recipient.id}>
              <input
                type="radio"
                value={recipient.id}
                name="recipient"
                onChange={this.handleChange}
              />
              {recipient.name}
            </label>
          ))}
        </div>
        Add an Idea for a Gift:
        <div>
          <form>
            <label>
              Gift Idea:
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Gift Description:
              <textarea
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Link to gift:
              <input
                type="text"
                name="link"
                value={this.state.link}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Notes:
              <textarea
                name="notes"
                value={this.state.notes}
                onChange={this.handleChange}
              />
            </label>
          </form>
          <button onClick={this.handleAddGift}>Add this gift idea</button>
        </div>
      </div>
    );
  }
}

export default AddGift;
