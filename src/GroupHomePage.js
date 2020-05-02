import React, { Component } from "react";

import NavBar from "./components/NavBar";
import AddGift from "./components/AddGift";
import ShowGiftIdeas from "./components/ShowGiftIdeas";
import Post from "./components/Post";
import ListPosts from "./components/ListPosts";

import "bootstrap/dist/css/bootstrap.min.css";

class GroupHomePage extends Component {
  state = {
    group: "",
    members: [],
    recipients: [],
    giftIdeas: [],
    posts: [],
    showModal: false
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  componentDidMount() {
    const id = this.props.routerProps.match.params.id;
    fetch(`http://localhost:3001/api/v1/groups/${id}`)
      .then((response) => response.json())
      .then((result) => {
  
        this.setState({
          group: result.group,
          members: result.members,
          recipients: result.recipients,
          giftIdeas: result.gifts.flat(),
          posts: result.posts,
        });
      });
  }

  addGiftToGiftIdeas = (gift) => {
    this.setState({
      recipients: [...this.state.recipients],
      giftIdeas: [...this.state.giftIdeas, gift],
    });
  };

  addNewPost = (post) => {
    this.setState({
      posts: [...this.state.posts, post],
    });
  };

  handleAddGift = (gift) => {

   this.addGiftToGiftIdeas(gift);

    fetch("http://localhost:3001/api/v1/gifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(gift),
    })
  };

  render() {
    const recipientTitle = this.state.recipients.map(
      (recipient) => recipient.name
    );
  
    return (
      <div>
        <NavBar
          currentUser={this.props.currentUser}
          handleLogout={this.props.handleLogout}
          routerProps={this.props.routerProps}
        />
        <div className="welcome-user">
          {this.state.group.name} Group: Group Gift for{" "}
          {recipientTitle.join(" + ")}
        </div>
        <div className="group-div">
          <h4 className='group-members-title'>Group Members</h4>
          <ul className='group-member-ul'>
            <li>{this.props.currentUser.name}</li>
            {this.state.members.map((member) => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>
        <div className="post-div">
          <div className='list-posts-div'>
            <ListPosts posts={this.state.posts} members={this.state.members}/>
          </div>
          <div className='add-post-div'>
            <Post
              currentUser={this.props.currentUser}
              group={this.state.group}
              addNewPost={this.addNewPost}
            />
          </div>
        </div>
        <div className='gift-div'>
          <div>
            <ShowGiftIdeas
              gifts={this.state.giftIdeas}
              recipients={this.state.recipients}
            />
          </div>
          <div>
            <button onClick={this.open}>Add A Gift Idea</button>
            <AddGift
              showModal={this.state.showModal}
              onClose={this.close}
              handleAddGift={this.handleAddGift}
              recipients={this.state.recipients}
              addGiftToGiftIdeas={this.addGiftToGiftIdeas}
            />
          </div>
        </div>
        <div>
          {this.props.currentUser.id === this.state.group.admin_user_id ? (
            <button className='delete-group'>Delete Group</button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default GroupHomePage;
