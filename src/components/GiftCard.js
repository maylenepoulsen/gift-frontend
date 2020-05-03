import React, { Component } from "react";

import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GiftCard extends Component {
  state = {
    likes: [],
    heartState: false,
    like: 0,
  };

  componentDidMount() {
    const giftId = this.props.gift.id;
    fetch(`http://localhost:3001/api/v1/likes/${giftId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        let heartState = result.find(like => like.user_id === this.props.currentUser.id)
        if(heartState && heartState.likes === 1) {
          this.setState({
            likes: result,
            heartState: true,
            like: 1
          })
        }
        this.setState({
          likes: result,
        });
      });
  }

  handleLikeClick = () => {
    const giftId = this.props.gift.id;
    let likes = this.state.heartState ? 0 : this.state.like + 1;
    let updateLike = this.state.likes.find(
      (like) => like.user_id === this.props.currentUser.id
    );

    this.setState({
      heartState: !this.state.heartState,
      like: likes,
    });

    const likeObject = {
      likes: likes,
      gift_id: this.props.gift.id,
      user_id: this.props.currentUser.id,
      name: this.props.currentUser.name,
    };

    if (updateLike) {
      updateLike.likes = likes
      fetch(`http://localhost:3001/api/v1/likes/${giftId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(likeObject),
      })
      .then(response => response.json())
      .then(result => console.log(result));
    } else {
      fetch(`http://localhost:3001/api/v1/likes/${giftId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(likeObject),
      })
        .then((response) => response.json())
        .then((result) =>
          this.setState({
            likes: [...this.state.likes, result],
          })
        );
    }
  };

  render() {
    let num = 0;
    if (this.state.likes.length > 0) {
      this.state.likes.map((like) => (num += like.likes));
    }

    return (
      <div>
        <div>
          <span>
            <FontAwesomeIcon icon={faGift} style={{ color: "#3dd2cc" }} />
          </span>
          <span className="gift-name">{this.props.gift.name}</span>
          <span className="gift-price">$ {this.props.gift.price}</span>
        </div>
        <div className="gift-description">
          Description: {this.props.gift.description}
        </div>
        <div>Link: {this.props.gift.link}</div>
        <div className="like-gift">
          <span onClick={this.handleLikeClick}>
            {this.state.heartState ? (
              <i className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </span>
          <span className="likes-text">{num}</span>
        </div>
      </div>
    );
  }
}

export default GiftCard;
