import React, { Component } from "react";

class NavBar extends Component {
  handleClick = () => {
    this.props.handleLogout()
  }  

  render() {
    return (
      <div>
        <ul>
          <li>
            <button onClick={this.handleClick}>Logout</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar
