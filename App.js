import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { config } from './private';
import Router from './Router';
import { store } from './src/store';
if(__DEV__) { // eslint-disable-line
  import('./config/ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import Reactotron from 'reactotron-react-native'; // eslint-disable-line

export default class App extends Component {
  componentWillMount() {
    // TODO: right here load their recent, their favorites, and settings into redux
    firebase.initializeApp(config);
  }

  render() {
    Reactotron.log('hello from AppContainerrrrr');
    Reactotron.warn('*glares*');
    Reactotron.error('Now you\'ve done it.');
    Reactotron.display({
      name: 'KNOCK KNOCK',
      preview: 'Who\'s there?',
      value: 'Orange.'
    });
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
