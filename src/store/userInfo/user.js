import { handleActions, createAction } from 'redux-actions';
import firebase from 'firebase';
import { setCurrentLocation } from '../location/locationServices';
// import { getRegionForCoordinates } from '../../helpers/helpersFunctions';
// import { latDelta, longDelta } from '../../Styles';

const defaultState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  password: '',
  zipCode: '',
  email: '',

  profilePic: '',
  bio: 'bio',
  gender: '',
  dob: '',

  favorites: '',
  other: null
};

const prefix = 'NU_STORE/USER_INFO/';
export const updateFirstName = createAction(`${prefix}UPDATE_FIRST_NAME`);
export const updateLastName = createAction(`${prefix}UPDATE_LAST_NAME`);
export const updatePhoneNumber = createAction(`${prefix}UPDATE_PHONE_NUMBER`);
export const updatePassword = createAction(`${prefix}UPDATE_PASSWORD`);
export const updateZipCode = createAction(`${prefix}UPDATE_ZIP_CODE`);
export const updateEmail = createAction(`${prefix}UPDATE_EMAIL`);

export const setProfilePic = createAction(`${prefix}SET_PROFILE_PIC`);
export const setBio = createAction(`${prefix}SET_BIO`);
export const setGender = createAction(`${prefix}SET_GENDER`);
export const setDob = createAction(`${prefix}SET_DOB`);

export const setFavorites = createAction(`${prefix}SET_FAVORITES`);
export const setOther = createAction(`${prefix}SET_OTHER`);

export const clearState = createAction(`${prefix}CLEAR_USER_STATE`);

export default handleActions({
  [updateFirstName]: (state, { payload }) => ({
    ...state,
    firstName: payload
  }),
  [updateLastName]: (state, { payload }) => ({
    ...state,
    lastName: payload
  }),
  [updatePhoneNumber]: (state, { payload }) => ({
    ...state,
    phoneNumber: payload
  }),
  [updatePassword]: (state, { payload }) => ({
    ...state,
    password: payload
  }),
  [updateZipCode]: (state, { payload }) => ({
    ...state,
    zipCode: payload
  }),
  [updateEmail]: (state, { payload }) => ({
    ...state,
    email: payload
  }),

  [setProfilePic]: (state, { payload }) => ({
    ...state,
    profilePic: payload
  }),
  [setBio]: (state, { payload }) => ({
    ...state,
    bio: payload
  }),
  [setGender]: (state, { payload }) => ({
    ...state,
    gender: payload
  }),
  [setDob]: (state, { payload }) => ({
    ...state,
    dob: payload
  }),

  [setFavorites]: (state, { payload }) => ({
    ...state,
    favorites: payload
  }),
  [setOther]: (state, { payload }) => ({
    ...state,
    other: payload
  }),

  [clearState]: (state, { payload }) => ({ // eslint-disable-line
    ...defaultState
  })

}, defaultState);

export const signUserUp = passWord => (dispatch, getState) => {
  const {
    userInfo: {
      user: {
        email,
        password
      }
    }
  } = getState();
  return firebase.auth().createUserWithEmailAndPassword(email.toLowerCase(), password); // use return otherwise it will try to regulate password length
};

export const addFormInfo = () => (dispatch, getState) => {
  const { currentUser } = firebase.auth();

  const {
    userInfo: {
      user: {
        firstName,
        lastName,
        zipCode,
        phoneNumber,
        email
      }
    }
  } = getState();

  // TODO: SWITCH IT OFF TEST DATA FOLDER IN FIREBASE
  // return firebase.database().ref(`/users/${currentUser.uid}/testAccounts`)
  return firebase.database().ref(`/users/testAccounts/${currentUser.uid}`) // TODO ***** WILL HAVE SUBFOLDER LIKE USER INFO, LIKES ETC
    .push({
      firstName,
      lastName,
      email,
      zipCode,
      phoneNumber,
      logIns: 1,
      moreUsefulData: 'goes here',
      userData: {}
    });
};


export const clearAll = () => (dispatch, getState) => {
  dispatch(updateFirstName(null));
  dispatch(updateLastName(null));
  dispatch(updatePhoneNumber(null));
  dispatch(updatePassword(null));
  dispatch(updateZipCode(null));
  dispatch(updateEmail(null));
};

// I assume this would work, load the info redux and have the app read from state
export const userInfoFetch = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    // **** this is assuming that getting info with the current user uid gives you full access to the information bc doing it with it doesnt!
    firebase.database().ref('/users/testAccounts/vdSfqJpFXidXXy9RAgyWqDxEx6I3/-LKy4WpC_8mhAKMaMkvo')
    // firebase.database().ref(`/users/testAccounts/${currentUser.uid}`) // dCpWn7CLu9bx3ZVEoBOx8bNdINT2
      .on('value', snapshot => {
        console.log('🤑 cha ching user info fetch payload', snapshot.val());
        const {
          email,
          firstName,
          lastName,
          logIns,
          moreUsefulData,
          phoneNumber,
          userData,
          zipCode
        } = snapshot.val();

        dispatch(updateFirstName(firstName));
        dispatch(updateLastName(lastName));
        dispatch(updatePhoneNumber(phoneNumber));
        dispatch(updateZipCode(zipCode));
        dispatch(updateEmail(email));

        // ***!!! THE REASON THAT YOU SET A CURRENT LOCATION HERE ON THE USER INFO IS BECAUSE ITLL EITHER BE PRIVATE AND HAVE A confirmED one LIKE BELOW OR ITLL USE THE BUILT IN PHONE GET LOCATION
        dispatch( setCurrentLocation({ latitude: 37.767, longitude: -122.421 })); // would be saved, using random steve data here
        // dispatch(setCurrentLocation( "PRIVATE_LOCATION" ) );

        dispatch(setOther(email));
      },
      error => {
        console.log('err', error);
      });
  };
};


export const getAppData = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    /// ===>> favorites and history would live on the user profile, featured wouldnt but theyll all be the same TYPE of arrays (same objs)
    firebase.database().ref(`/city/atlanta/testAccounts/${111222333}/-LVG0irfFjXpUsBbJKXl`)
      .on('value', snapshot => {
        dispatch(setFavorites(snapshot.val()));
      },
      error => {
        console.log('err', error);
      });
  };
};
