import React, { Component } from 'react';

class ListPosts extends Component {
  render() {
      return (
          <div>
              {this.props.posts.map((post, idx) => <div key={idx}>{post.body}</div>)}
          </div>
      )
  }
}

export default ListPosts;
