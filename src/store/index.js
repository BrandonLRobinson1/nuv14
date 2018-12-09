import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools'; // eslint-disable-line
import thunk from 'redux-thunk';
import logIn from './logIn';
import userInfo from './userInfo';
import location from './location';

const rootReducer = combineReducers({
  logIn,
  location,
  userInfo
});

console.log('winder', window);

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
export const store = createStore(rootReducer, /* preloadedState, */ // eslint-disable-line
  composeEnhancers( // eslint-disable-line
    applyMiddleware(thunk),
  // other store enhancers if any
));
