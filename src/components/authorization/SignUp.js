import React, { Component } from "react";

class SignUp extends Component {
  state = {
    name: "",
    password: "",
    passwordConfirmation: "",
    email: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      password_digest: this.state.password,
      email: this.state.email
    }

    fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', data.jwt)
      console.log(data)
      this.setState({
        name: "",
        password: "",
        passwordConfirmation: "",
        email: "",
      })
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
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
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
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Password confirmation"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
            required
          />
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
