import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools'; // eslint-disable-line
import { reactotronRedux } from 'reactotron-redux'
import thunk from 'redux-thunk';
import Reactotron from '../../config/ReactotronConfig'
import { createLogger } from 'redux-logger'
import logIn from './logIn';
import userInfo from './userInfo';
import location from './location';

// https://github.com/infinitered/reactotron/blob/master/examples/demo-react-native/App/Redux/index.js

const rootReducer = combineReducers({
  logIn,
  location,
  userInfo
});

// the logger master switch
const USE_LOGGING = false

// silence these saga-based messages
const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED']


// create the logger
const logger = createLogger({
  predicate: (getState, { type }) => USE_LOGGING && not(contains(type, SAGA_LOGGING_BLACKLIST))
})

// a function which can create our store and auto-persist the data
// export default () => {
  // const sagaMiddleware = createSagaMiddleware({
  //   sagaMonitor: Reactotron.createSagaMonitor()
  // })
  // const middleware = applyMiddleware(logger);
  const middleware = applyMiddleware(thunk);
export const store = createStore(rootReducer, compose(middleware, Reactotron.createEnhancer()))
  // sagaMiddleware.run(rootSaga)
  // return store;
// };


// const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
// const middleware = applyMiddleware(logger)
// const store = createStore(rootReducer, compose(middleware, Reactotron.createEnhancer()))


// ✋ because Reactotron only works on development mode
// const devType = 'development';
// let storeCreate = createStore(rootReducer, /* preloadedState, */ // eslint-disable-line
//   composeEnhancers( // eslint-disable-line
//     applyMiddleware(thunk),
//   other store enhancers if any
//   ));

// if (devType === 'development') {
//   storeCreate = Reactotron.createStore(rootReducer, /* preloadedState, */ // eslint-disable-line
//     composeEnhancers( // eslint-disable-line
//       applyMiddleware(thunk),
//     // other store enhancers if any
//     ));
// }

// export const store = storeCreate;

// // sure fire
// export const store = createStore(rootReducer, /* preloadedState, */ // eslint-disable-line
//   composeEnhancers( // eslint-disable-line
//     applyMiddleware(thunk),
//   // other store enhancers if any
//   ));
