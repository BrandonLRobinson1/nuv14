import { handleActions, createAction } from 'redux-actions';

const defaultState = {
  thing: false
};

const prefix = 'DUMMYSTORE/STORENAME/';
export const setOrUpdateThing = createAction(`${prefix}SET_OR_UPDATE_THING`);


export default handleActions({
  [setOrUpdateThing]: (state, { payload }) => ({
  ...state,
  Thing: payload
  }),

}, defaultState);


export const someAsyncT = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch(setHasServerError(true));
    resolve();
  });
};


// How to pull real time data from firebase
// export const employeesFetch = () => {
//   const { currentUser } = firebase.auth();
//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/employees`)
//       .on('value', snapshot => {
//         console.log('cha ching ... payload', snapshot)
//         dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() })
//       })
//   }
// }