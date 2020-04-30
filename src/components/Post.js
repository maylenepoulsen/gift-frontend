import React, { Component } from "react";

class Post extends Component {
  state = {
    post: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handlePostSubmit = (event) => {
    event.preventDefault();
    let now = new Date();
    
    const post = {
      body: this.state.post,
      date: now,
      name: this.props.currentUser.name,
      user_id: this.props.currentUser.id,
      group_id: this.props.group.id,
    };
    fetch("http://localhost:3001/api/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(post),
    })
      this.setState({
        post: ''
      })
      this.props.addNewPost(post)
  };

  render() {
    return (
      <form>
        <label>
          Chat:
          <textarea
            name="post"
            value={this.state.post}
            onChange={this.handleChange}
          />
        </label>
        <button onClick={this.handlePostSubmit}>Add comment</button>
      </form>
    );
  }
}

export default Post;
