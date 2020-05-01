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
    });
    this.setState({
      post: "",
    });
    this.props.addNewPost(post);
  };

  render() {
    return (
      <form>
        <textarea
          name="post"
          className="textarea-post"
          value={this.state.post}
          onChange={this.handleChange}
        />
        <div>
          <button className='add-comment' onClick={this.handlePostSubmit}>Add comment</button>
        </div>
      </form>
    );
  }
}

export default Post;
