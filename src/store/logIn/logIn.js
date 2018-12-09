import { handleActions, createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

const defaultState = {
  email: '',
  password: ''
};

const prefix = 'NU_STORE/LOG_IN/';
export const updateLogInEmail = createAction(`${prefix}UPDATE_LOG_IN_EMAIL`);
export const updateLogInPassword = createAction(`${prefix}UPDATE_LOG_IN_PASSWORD`);

export default handleActions({
  [updateLogInEmail]: (state, { payload }) => ({
    ...state,
    email: payload
  }),
  [updateLogInPassword]: (state, { payload }) => ({
    ...state,
    password: payload
  })
}, defaultState);

export const logUserIn = () => (dispatch, getState) => {
  // const { currentUser } = firebase.auth();
  const {
    logIn: {
      logIn: {
        email,
        password
      }
    }
  } = getState();

  console.log('email, password ', email, password);
  return firebase.auth().signInWithEmailAndPassword(email.toLowerCase(), password);
};
