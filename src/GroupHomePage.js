import React, { Component } from "react";

import NavBar from "./components/NavBar";
import AddGift from './components/AddGift';
import ShowGiftIdeas from './components/ShowGiftIdeas';
import Post from './components/Post';
import ListPosts from './components/ListPosts';

class GroupHomePage extends Component {
  state = {
    group: "",
    members: [],
    recipients: [],
    giftIdeas: [],
    posts: []
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
          posts: result.posts
        });
      });
  }

  addGiftToGiftIdeas = (gift) => {
   this.setState({
     giftIdeas: [...this.state.giftIdeas, gift]
   })
  }

  addNewPost = (post) => {
    this.setState({
      posts: [...this.state.posts, post]
    })
  }

  render() {
    return (
      <div>
        <NavBar
          currentUser={this.props.currentUser}
          handleLogout={this.props.handleLogout}
          routerProps={this.props.routerProps}
        />
        This is the Group Home Page for {this.state.group.name}
        <div>
          Group Members:
          <ul>
            <li>{this.props.currentUser.name}</li>
            {this.state.members.map((member) => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>
        <div>
          Who we are giving a gift for:
          <ul>
            {this.state.recipients.map((recipient) => (
              <li key={recipient.id}>{recipient.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <ListPosts posts={this.state.posts}/>
        </div>
        <div>
          <Post currentUser={this.props.currentUser} group={this.state.group}  addNewPost={this.addNewPost} />
        </div>
        <div>
          <AddGift recipients={this.state.recipients} addGiftToGiftIdeas={this.addGiftToGiftIdeas}/>
        </div>
        <div>
          <ShowGiftIdeas gifts={this.state.giftIdeas} recipients={this.state.recipients}/> 
        </div>
        <div>
          {(this.props.currentUser.id === this.state.group.admin_user_id) ? 
           <button>Delete Group</button> : <div></div>}
        </div>
      </div>
    );
  }
}

export default GroupHomePage;
