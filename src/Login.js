import React, { Component } from "react";
import Auth from "./lib/Auth";
import { Redirect } from "react-router-dom";
const auth = new Auth();

class Login extends Component {
    state = { redirectToReferrer: false };

    constructor(auth){
        super();
    }

    login = () => {
       this.props.auth.login();
    };

    render() {
        
        if(this.props.auth.isAuthenticated()){
            return <Redirect to="/dashboard" />;
        } else {
            return (
                <div>
                    <p>Click to login</p>
                    <button onClick={this.login}>Log in</button>
                </div>
            );
        }
    }
}

/*
class Login extends Component {
    state = {  };

    login = () => {
        auth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        // if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}*/

export default Login;