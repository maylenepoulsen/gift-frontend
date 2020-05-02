import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class AddGift extends Component {
  state = {
    name: "",
    price: "",
    description: "",
    link: "",
    notes: "",
    recipient: "",
    showModal: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  giftAdd = (event) => {
    event.preventDefault();
    const gift = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      link: this.state.link,
      notes: this.state.notes,
      recipient_id: this.state.recipient,
    };

    this.props.handleAddGift(gift);

    this.setState({
      name: "",
      price: "",
      description: "",
      link: "",
      notes: "",
      recipient: "",
    });
    this.props.onClose()
  };

  renderAddGift = () => {
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
          <button onClick={this.giftAdd}>Add this gift idea</button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.onClose}>
          <Modal.Header closeButton={true} style={{ color: "#3e6b89" }}>
            <h3>Add A Gift Idea</h3>
          </Modal.Header>
          {this.renderAddGift()}
        </Modal>
      </div>
    );
  }
}

export default AddGift;
