import React, { Component } from "react";

class GiftCard extends Component {
  render() {
    const id = this.props.recipient.id;
    const gifts = this.props.gifts.filter((gift) => gift.recipient_id === id);

    return (
      <div>
        Gifts for {this.props.recipient.name}:
        {gifts.map((gift) => (
          <div key={gift.id}>
            <p>{gift.name}</p>
            Price: {gift.price}
            Description: {gift.price}
            Link: {gift.link}
            Notes: {gift.notes}
            <button type="button" className="btn btn-default btn-sm">
              <span className="glyphicon glyphicon-heart"></span> Like
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default GiftCard;
