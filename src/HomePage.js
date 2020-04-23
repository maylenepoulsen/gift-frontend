import React, { Component } from 'react';
import SignUp from './components/authorization/SignUp';
import Login from './components/authorization/Login';

class HomePage extends Component {
    render() {
        return (
            <div>
                <h2>This is the Home Page</h2>
                <Login handleLogin={this.props.handleLogin} routerProps={this.props.routerProps}/>
                <SignUp />
            </div>
        )
    }
}

export default HomePage;