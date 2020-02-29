import Auth0Lock from 'auth0-lock';
import Axios from 'axios';

const RENEW_TOKEN_TIMER_OFFSET = 60000; // 60 seconds

export default class Auth {
  constructor() {
    // create the base Auth0 Lock object and add our listeners to it
    Axios({
      url:
        'https://maana-helloworld-api-dev.azurewebsites.net/api/HttpTrigger1?code=ByzsTg06FIzNfBhZ7RkICxIg73sEcoOaWq2h7HC14pmh18Fgo/K6Qw==',
      method: 'get'
    }).then(res => {
      if (res['data']['access_token'] !== null) {
        localStorage.setItem('access_token', res['data']['access_token']);
      }
      console.log('JWT response received!');
    });
  }

  /**
   * Displays the Auth0 login screen
   */
  login = () => true;

  /**
   * Handles errors during authentication
   *
   * @param {Error} err that happened during auth
   */
  handleError = err => {
    console.error('Issue during authentication', err);
    alert(`Error: ${err.error}. Check the console for further details.`);
    // return us to the homepage, as we should be at /callback right now
    window.location.pathname = '/';
  };

  /**
   * Handles saving authentication once we are done signing in
   *
   * @param {Object} authResult contains the results of authentication
   */
  handleAuthenticated = authResult => {
    // save the session information
    this.setSession(authResult);
  };

  /**
   * Pulls the access token out of local storage and returns it
   *
   * @returns {string} the current access token
   */
  getAccessToken = () => {
    return localStorage.getItem('access_token');
  };

  /**
   * Pulls the profile out of local storage and returns it
   *
   * @returns {Object} the users profile information
   */
  // getProfile = () => {
  //   const profile = localStorage.getItem('profile');
  //   if (!profile) {
  //     return {};
  //   }
  //   return JSON.parse(profile);
  // };

  /**
   * saves the information from authenication and schedules a token refresh
   *
   * @param {Object} authResult contains the information about authentication
   */
  // setSession(authResult) {
  //   // Set the time that the access token will expire at

  //   localStorage.setItem('access_token', authResult.accessToken);
  // }

  /**
   * Tries to renew the users access token
   */
  renewToken() {
    this.lock.checkSession({}, (err, result) => {
      if (err) {
        this.handleError(err);
      } else {
        this.setSession(result);
      }
    });
  }

  /**
   * When we have a valid access token schedule for it to be renewed.
   */
  scheduleRenewal() {
    const storedData = localStorage.getItem('expires_at');
    if (storedData) {
      const expiresAt = JSON.parse(storedData);
      const delay = expiresAt - Date.now() - RENEW_TOKEN_TIMER_OFFSET;
      if (delay > 0) {
        this.tokenRenewalTimeout = setTimeout(() => {
          this.renewToken();
        }, delay);
      }
    }
  }

  /**
   * Deletes the saved information from local storage
   */
  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
  };

  /**
   * Checks is the user is currently authenticated
   *
   * @returns {boolean} True when the user is currently authenticated
   */
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    // let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    // const delay = expiresAt - Date.now() - RENEW_TOKEN_TIMER_OFFSET;
    // return delay > 0;
    return true;
  };
}
