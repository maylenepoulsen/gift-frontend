import React, { Component } from 'react';

class ListPosts extends Component {    
  render() {
     if(this.props.members) {
      return (
          <div className='post-wrapper'>
              {this.props.posts.map((post, idx) => <div key={idx} className='single-post'><h6 className='post-user'>{post.name}:</h6>{post.body}</div>)}
          </div>
      )
     } else return <div></div>
  }
}

export default ListPosts;
