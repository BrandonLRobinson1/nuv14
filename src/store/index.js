import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import Reactotron from '../../config/ReactotronConfig';
import logIn from './logIn';
import userInfo from './userInfo';
import location from './location';
// import { createLogger } from 'redux-logger'

// https://github.com/infinitered/reactotron/blob/master/examples/demo-react-native/App/Redux/index.js
// for adding sagas or whatever refer to link
// https://www.youtube.com/watch?v=UiPo9A9k7xc

const rootReducer = combineReducers({
  logIn,
  location,
  userInfo
});

// the logger master switch
// const USE_LOGGING = false

// silence these saga-based messages
// const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED']

// create the logger
// const logger = createLogger({
//   predicate: (getState, { type }) => USE_LOGGING && not(contains(type, SAGA_LOGGING_BLACKLIST))
// })

// a function which can create our store and auto-persist the data
const middleware = applyMiddleware(thunk);
export const store = createStore(rootReducer, compose(middleware, Reactotron.createEnhancer()))
