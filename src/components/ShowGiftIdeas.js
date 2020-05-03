import React, { Component } from "react";
import GiftList from "./GiftList";

class ShowGiftIdeas extends Component {
  render() {
    return (
      <div>
        {this.props.recipients.map((recipient) => (
          <GiftList
            key={recipient.id}
            recipient={recipient}
            gifts={this.props.gifts}
            currentUser={this.props.currentUser}
          />
        ))}
      </div>
    );
  }
}

export default ShowGiftIdeas;
