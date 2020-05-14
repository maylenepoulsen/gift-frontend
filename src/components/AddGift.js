import React, { Component } from "react";
import { Modal, Form } from "react-bootstrap";

class AddGift extends Component {
  state = {
    name: "",
    price: "",
    description: "",
    link: "",
    notes: 'notes',
    recipient: "",
    // showModal: false,
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
      recipient: "",
    });
    this.props.onClose()
  };

  renderAddGift = () => {
    return (
      <div className='add-gift-mod'>
        <div>
         <span className='choose-recipient'>Choose a recipient:</span>
          {this.props.recipients.map((recipient) => (
            <label key={recipient.id}>
              <input
                type="radio"
                value={recipient.id}
                name="recipient"
                onChange={this.handleChange}
              />
              <span className='radio-recipient'>{recipient.name}</span>
            </label>
          ))}
        </div>
        <div>
          <form>
            <Form.Group>
              Gift Idea
              <Form.Control
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              >  
              </Form.Control>
            </Form.Group>
            <label>
              <span style={{paddingRight: '10px'}}>Price</span>
              <input
                type="number"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Gift Description
              <textarea
                name="description"
                className='add-gift-description'
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
            <Form.Group>
              Link to Gift
              <Form.Control
               type="text"
               name="link"
               value={this.state.link}
               onChange={this.handleChange}
              >
              </Form.Control>
            </Form.Group>
          </form>
          <button className='gift-btn-mod' onClick={this.giftAdd}>Add Gift</button>
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
