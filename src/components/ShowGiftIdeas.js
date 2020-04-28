import React, { Component } from "react";
import GiftCard from './GiftCard';

class ShowGiftIdeas extends Component{

  render() {
    return (
      <div>
       {this.props.recipients.map((recipient) => <GiftCard key={recipient.id} recipient={recipient} gifts={this.props.gifts}/>)}
      </div>
    );
  }
}

export default ShowGiftIdeas;
