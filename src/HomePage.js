import React, { Component } from 'react';
import SignUp from './components/authorization/SignUp';

class HomePage extends Component {
    render() {
        return (
            <div>
                <h2>This is the Home Page</h2>
                <SignUp />
            </div>
        )
    }
}

export default HomePage;