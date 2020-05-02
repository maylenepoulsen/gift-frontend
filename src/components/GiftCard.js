import React, { Component } from "react";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GiftCard extends Component {
  render() {
    const id = this.props.recipient.id;
    const gifts = this.props.gifts.filter((gift) => gift.recipient_id === id);

    return (
      <div>
        Gifts for {this.props.recipient.name}:
        {gifts.map((gift) => (
          <div key={gift.id}>
             <div>
              <FontAwesomeIcon icon={faGift} /> {gift.name}
            </div>
           
            Price: {gift.price}
            Description: {gift.price}
            Link: {gift.link}
            Notes: {gift.notes}
            <div><i class="far fa-heart"></i> 2</div>
          </div>
         
        ))}
      </div>
    );
  }
}

export default GiftCard;
