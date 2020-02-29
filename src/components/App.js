import React, { Component } from 'react';
import Dashboard from '../containers/dashboard';

import 'typeface-roboto';
import '../styles/App.css';

/*
function PrivateRoute({ component: Component, ...rest }) {
  
  // return <Component {...props} />;

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
  
}
*/

class App extends Component {
  geolocationAllowed(pos) {
    let location = pos.coords;
    this.props.setGeolocation(location);
  }

  geolocationDenied(err) {
    console.warn(err);
  }

  render() {
    const { auth } = this.props;
    console.log('TCL: App -> render -> auth', auth.isAuthenticated());

    // if we are not logged in, then show the login dialog

    // if (window.location.pathname !== '/dashboard' && !auth.isAuthenticated()) {
    //   auth.login();
    // } else {
    //   this.props.setUserProfile(auth.getProfile());
    //   navigator.geolocation.getCurrentPosition(
    //     this.geolocationAllowed.bind(this),
    //     this.geolocationDenied.bind(this),
    //     this.geolocationOptions
    //   );
    // }

    return (
      <div className='App'>
        {window.location.pathname === '/dashboard' ||
        !auth.isAuthenticated() ? (
          // don't try and load the services if we are still working on authentication
          <div />
        ) : (
          // load and show the services

          <Dashboard />
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
