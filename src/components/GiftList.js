import React, { Component } from "react";

import GiftGard from "./GiftCard";

class GiftList extends Component {
  
  render() {
    const id = this.props.recipient.id;
    const gifts = this.props.gifts.filter((gift) => gift.recipient_id === id);

    return (
      <div>
        <h5 className="gifts-for">Gifts for {this.props.recipient.name}:</h5>
        {gifts.map((gift) => (
          <GiftGard key={gift.id} gift={gift} currentUser={this.props.currentUser}/>
        ))}
      </div>
    );
  }
}

export default GiftList;
