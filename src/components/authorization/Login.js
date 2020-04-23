import React, { Component } from "react";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        this.props.handleLogin(data.user)
      });
      this.setState({
        email: "",
        password: "",
      })
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
