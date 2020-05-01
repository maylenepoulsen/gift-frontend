import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class Login extends Component {
  state = {
    showModal: false,
    smShow: false,
    name: "",
    email: "",
    password: "",
    mode: "login",
  };

  setMode = (mode) => {
    this.setState({
      mode,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLoginModal = (event) => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.handleSubmit(user);
  };

  handleSignupModal = (event) => {
    event.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.handleSubmitSignup(user);
  };

  renderRegister = () => {
    return (
      <div>
        <div>
          <form className="form-horizontal form-loanable">
            <fieldset>
              <div className="form-group has-feedback required">
                <label htmlFor="login-name" className="col-sm-5">
                  Name
                </label>
                <div className="col-sm-7">
                  <span
                    className="form-control-feedback"
                    aria-hidden="true"
                  ></span>
                  <input
                    type="text"
                    name="name"
                    id="login-name"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group has-feedback required">
                <label htmlFor="login-email" className="col-sm-5">
                  Email
                </label>
                <div className="col-sm-7">
                  <span
                    className="form-control-feedback"
                    aria-hidden="true"
                  ></span>
                  <input
                    type="text"
                    name="email"
                    id="login-email"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group has-feedback required">
                <label htmlFor="login-password" className="col-sm-5">
                  Password
                </label>
                <div className="col-sm-7">
                  <span
                    className="form-control-feedback"
                    aria-hidden="true"
                  ></span>
                  <div className="login-password-wrapper">
                    <input
                      type="password"
                      name="password"
                      id="login-password"
                      className="form-control"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="form-action">
              <button
                onClick={this.handleSignupModal}
                className="btn btn-lg btn-primary btn-left"
                style={{
                  backgroundColor: "#3dd2cc",
                  border: "none",
                  fontFamily: "Roboto",
                }}
              >
                Submit <span className="icon-arrow-right2 outlined"></span>
              </button>
            </div>
          </form>
        </div>
        <a
          href="#"
          alt="login"
          onClick={(e) => {
            e.preventDefault();
            this.setMode("login");
          }}
          style={{color: '#3e6b89'}}
        >
          Log in here
        </a>
      </div>
    );
  };

  renderLogin = () => {
    return (
      <div>
        <form className="form-horizontal form-loanable">
          <fieldset>
            <div className="form-group has-feedback required">
              <label htmlFor="login-email" className="col-sm-5">
                Enter your email
              </label>
              <div className="col-sm-7">
                <span
                  className="form-control-feedback"
                  aria-hidden="true"
                ></span>
                <input
                  type="text"
                  name="email"
                  id="login-email"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.email}
                  required
                />
              </div>
            </div>
            <div className="form-group has-feedback required">
              <label htmlFor="login-password" className="col-sm-5">
                Password
              </label>
              <div className="col-sm-7">
                <span
                  className="form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div className="login-password-wrapper">
                  <input
                    type="password"
                    name="password"
                    id="login-password"
                    className="form-control"
                    required
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </div>
              </div>
            </div>
          </fieldset>
          <div className="form-action">
            <button
              onClick={this.handleLoginModal}
              className="btn btn-lg btn-primary btn-left"
              style={{
                backgroundColor: "#3dd2cc",
                border: "none",
                fontFamily: "Roboto",
              }}
            >
              Submit <span className="icon-arrow-right2 outlined"></span>
            </button>
          </div>
        </form>
        <a
          href="#"
          alt="signup"
          onClick={(e) => {
            e.preventDefault();
            this.setMode("register");
          }}
          style={{color: '#3e6b89'}}
        >
          Create your account
        </a>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.onClose}>
          <Modal.Header closeButton={true} style={{color: '#3e6b89'}}>
            <h3>
              {this.state.mode === "login"
                ? "Login"
                : this.state.mode === "register" ? "Create an Account" : this.state.mode === 'login'}
            </h3>
          </Modal.Header>
          <Modal.Body>
            {this.state.mode === "login"
              ? this.renderLogin()
              : this.state.mode === "register"
              ? this.renderRegister()
              : null}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Login;
