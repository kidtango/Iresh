import React, { Component } from "react";
import Services from "./Services";
// import { BrowserRouter as Router, Route, Link, withRouter, Redirect, IndexRoute } from "react-router-dom";
// import Login from "./Login";
import Auth from "./lib/Auth";
// import auth from "./lib/fakeAuth";
import { Provider } from 'react-redux'
import Dashboard from './containers/Dashboard';
import { StylesProvider } from "@material-ui/styles";

import 'typeface-roboto';
import logo from "./logo.svg";
import "./styles/App.css";


function PrivateRoute({ component: Component, ...rest }) {
  
  // return <Component {...props} />;

  /*
  return (
    <Route
      {...rest}
      render={props => {
          if(rest.auth.isAuthenticated()) {
            return (<Component {...props} />);
          } else {
            return (<Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />);
          }
        }
      }
    />
  );
  */
}

class App extends Component {
  render() {
    const { auth, store } = this.props;

    // if we are not logged in, then show the login dialog
    
    if (/*window.location.pathname !== "/dashboard" && */!auth.isAuthenticated()) {
      auth.login();
    }
    
    return (
      <div className="App">
        {/*window.location.pathname === "/dashboard" || */!auth.isAuthenticated() ? (
          // don't try and load the services if we are still working on authentication
          <div />
        ) : (
          // load and show the services
          <Provider store={store}>
            <Dashboard />
          </Provider>
        )}
      </div>
    );
    

    /*
    <ul>
      <li>
        <Link to="/public">Public Page</Link>
      </li>
      <li>
        <Link to="/protected">Protected Page</Link>
      </li>
    </ul>
    <Route path="/public" component={Public} />
    */

    // <Redirect from="/" to={Login} />

    // <AuthButton />
    // sections to add home search help info logouts
    // <Redirect from="/" to="/dashboard"/>

    /*
        <Route path="/" render={()=>{
          if(auth.isAuthenticated()){
            console.log("is authenticated");
            return <Redirect to="/dashboard"/>;
          } else {
            return <Redirect to="/login"/>;
          }
        }}/>
    */
  // <Route path="/callback" render={()=>(<Redirect to="/dashboard"/>)}/>
  
  /*
    return (
      <Provider store={store}>
        <Router>
            <IndexRoute path="/" render={()=><Login auth={auth}/>}/>
            <PrivateRoute path="/dashboard" component={Dashboard} auth={auth}/>
        </Router>
      </Provider>
    );
    */
    
  }
}

export default App;
