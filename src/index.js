import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';
import Auth from './lib/Auth';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import irisApp from './reducers';

// apollo imports
import ApolloClient from 'apollo-boost';
import * as appActions from './actions/app';
import { Provider } from 'react-redux';
import devFavicon from './assets/development/favicon.ico';
import prodFavicon from './assets/production/favicon.ico';

let favicon =
  process.env.PUBLIC_URL +
  (process.env.REACT_APP_BACKEND_ENV === 'development'
    ? devFavicon
    : prodFavicon);
const manifest = {
  short_name: 'IRIS',
  name: 'IRIS - Maana',
  icons: [
    {
      src: favicon,
      sizes: '64x64 32x32 24x24 16x16',
      type: 'image/x-icon'
    }
  ],
  start_url: './index.html',
  display: 'standalone',
  theme_color: '#000000',
  background_color: '#ffffff'
};

const stringManifest = JSON.stringify(manifest);
const blob = new Blob([stringManifest], { type: 'application/json' });
const manifestURL = URL.createObjectURL(blob);
document
  .querySelector('#manifest-placeholder')
  .setAttribute('href', manifestURL);

let linkElement = document.createElement('link'),
  oldLink = document.getElementById('dynamic-favicon');
linkElement.id = 'dynamic-favicon';
linkElement.rel = 'shortcut icon';
linkElement.href = favicon;
if (oldLink) {
  document.head.removeChild(oldLink);
}
document.head.appendChild(linkElement);

//
// Client setup
// - allow this service to be a client of a remote service
//
const uri = process.env.REACT_APP_MAANA_ENDPOINT;
// const technicalUri = process.env.REACT_APP_MAANA_ENDPOINT_TECHNICAL;

// create the auth object
const auth = new Auth();
const token = auth.getAccessToken();
console.log('TCL: token', token);

const headers = {
  authorization: token ? `Bearer ${token}` : ''
};

// const clientTechnical = new ApolloClient({
//   uri: technicalUri,
//   headers
// });

const client = new ApolloClient({
  uri,
  headers
});

const store = createStore(irisApp, applyMiddleware(thunk));

store.dispatch(appActions.setAuthHeaders(headers));
store.dispatch(appActions.setApolloClient(client));
// store.dispatch(appActions.setOtherApolloClient(clientTechnical, 'technical'));

ReactDOM.render(
  <Provider store={store}>
    {token ? <App auth={auth} /> : <div>please reload page...</div>}
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
