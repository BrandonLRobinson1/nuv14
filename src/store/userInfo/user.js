import { handleActions, createAction } from 'redux-actions';
import firebase from 'firebase';
import { setCurrentLocation } from '../location/locationServices';

// import dummydata from '../dummyMembers.json';
// import { getRegionForCoordinates } from '../../helpers/helpersFunctions';

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

  favorites: null,
  other: null,

  userDataLoading: true,
  appDataLoading: true
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

export const setUserInfoLoading = createAction(`${prefix}SET_USER_INFO_LOADING`);
export const setAppDataLoading = createAction(`${prefix}SET_APP_DATA_LOADING`);

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
  [setUserInfoLoading]: (state, { payload }) => ({
    ...state,
    userDataLoading: payload
  }),
  [setAppDataLoading]: (state, { payload }) => ({
    ...state,
    appDataLoading: payload
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
  console.log('passWord, password', passWord, password);
  // TODO: fix how this is recieving the password, at least make it consistent all fro m redux all from component
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


  // return firebase.database().ref(`/users/${currentUser.uid}/testAccounts`)
  return firebase.database().ref(`/users/testAccounts/FINDME/${currentUser.uid}`)

  // return firebase.database().ref(`/users/testAccounts/${currentUser.uid}`)
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

export const userInfoFetch = () => dispatch => {
  // const { currentUser } = firebase.auth();
  return firebase.database().ref(`/users/testAccounts/FINDME/u3cpy3UdMoWHThsme7XGyDLnl8G3/-Le8i7VGCjxhpOl4KJwK`)
  // return firebase.database().ref('/users/testAccounts/vdSfqJpFXidXXy9RAgyWqDxEx6I3/-LKy4WpC_8mhAKMaMkvo')
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

      // ***!!! TODO: fix -> THE REASON THAT YOU SET A CURRENT LOCATION HERE ON THE USER INFO IS BECAUSE ITLL EITHER BE PRIVATE AND HAVE A confirmED one LIKE BELOW OR ITLL USE THE BUILT IN PHONE GET LOCATION
      dispatch(setCurrentLocation({ latitude: 37.767, longitude: -122.421 })); // would be saved, using random steve data here
      // dispatch(setCurrentLocation( "PRIVATE_LOCATION" ) );
      dispatch(setOther(email));
      dispatch(setUserInfoLoading(false));
      return true;
    },
    error => {
      console.log('err', error);
      dispatch(setUserInfoLoading(false));
      return false;
    });
};


const reauthenticate = (firebaseUserObj, currentPassword) => {
  const credentials = firebase.auth.EmailAuthProvider.credential(firebaseUserObj.email, currentPassword);
  return firebaseUserObj.reauthenticateAndRetrieveDataWithCredential(credentials);
};

export const updateEmailAddress = userInfo => async dispatch => {
  const user = firebase.auth().currentUser;
  const { email, password } = userInfo;

  // 🚒 i think this may be error prone, test .. especially aftersecond then im worried itll update in the firebase storage of the email and not my stored email field (currently works but test scenarios);
  return reauthenticate(user, password)
    .then(() => {
      user.updateEmail(email)
        // will only run this 'then' if the email update is succesful so it may not be that error prone
        .then(() => {
          // TODO: user.uid and bucket '/-Le8i7VGCjxhpOl4KJwK' are not connected as i thought
          const userRef = firebase.database().ref(`/users/testAccounts/FINDME/${user.uid}`);
          userRef.child('/-Le8i7VGCjxhpOl4KJwK').update({ email })
            .then(() => 'Email Updated')
            .catch(err => {
              throw new Error(err);
            });
        })
        .catch(err => {
          console.log('email, password', email, password);
          throw new Error(err.message);
        });
    })
    .catch(err => {
      console.log('err*', err);
      throw (err.message);
    });
};

// https://firebase.google.com/docs/auth/web/manage-users
// var auth = firebase.auth();
// var emailAddress = "user@example.com";

// auth.sendPasswordResetEmail(emailAddress).then(function() {
//   // Email sent.
// }).catch(function(error) {
//   // An error happened.
// });
export const updateUserPassword = userInfo => async dispatch => {
  const user = firebase.auth().currentUser;
  const { password, newPassword } = userInfo;

  return reauthenticate(user, password)
    .then(() => user.updatePassword(newPassword)
      .then(() => 'Password Updated')
      .catch(err => {
        console.log('!password', password);
        throw new Error(err.message);
      }))
    .catch(err => {
      console.log('err*', err);
      throw (err.message);
    });
};

export const updateUserInfo = userInfo => async dispatch => {
  const user = firebase.auth().currentUser;
  const { firstName, lastName, zipCode } = userInfo;

  const userRef = firebase.database().ref(`/users/testAccounts/FINDME/${user.uid}`);
  userRef.child('/-Le8i7VGCjxhpOl4KJwK').update({ // this is where you can filter whats updated
    firstName,
    lastName,
    zipCode
  })
    .then(() => 'Email Updated') // TODO: cant seem to find to test a failing case
    .catch(err => {
      throw new Error(err);
    });
};

// ===>> favorites and history would live on the user profile, featured wouldnt but theyll all be the same TYPE of arrays (same objs)
export const getAppData = () => dispatch => { // should be in its own store since its discover data
  const { currentUser } = firebase.auth();
  return new Promise((resolve, reject) => {
    // firebase.database().ref('x')
    // return firebase.database().ref('/')
    return firebase.database().ref(`/city/atlanta/testAccounts/${111222333}/-LVG0irfFjXpUsBbJKXl`)
      .on('value', snapshot => {
        console.log('---------->', snapshot.val());
        dispatch(setFavorites(snapshot.val()));
        dispatch(setAppDataLoading(false));
        resolve(true);
      },
      error => {
        console.log('err', error);
        dispatch(setFavorites(null));
        dispatch(setAppDataLoading(false));
        resolve(false);
      });
  });
};

// export const getAppData = () => dispatch => { // should be in its own store since its discover data
//   const { currentUser } = firebase.auth();
//   // ===>> favorites and history would live on the user profile, featured wouldnt but theyll all be the same TYPE of arrays (same objs)

//   return firebase.database().ref('x')
//   // return firebase.database().ref('/')
//   // firebase.database().ref(`/city/atlanta/testAccounts/${111222333}/-LVG0irfFjXpUsBbJKXl`)
//     .on('value', snapshot => {
//       console.log('---------->', snapshot.val());
//       dispatch(setFavorites(snapshot.val()));
//       dispatch(setAppDataLoading(false));
//     },
//     error => {
//       console.log('err', error);
//       dispatch(setFavorites(null));
//       dispatch(setAppDataLoading(false));
//     });
// };
