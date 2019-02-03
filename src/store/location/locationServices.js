import { handleActions, createAction } from 'redux-actions';
import { getRegionForCoordinates } from '../../helpers/helpersFunctions'; // helper function is a way to get latitiud delta and longitude delta based on a number of points/markers
import { latDelta, longDelta } from '../../Styles';

// need to design this to grab info from every SESSION
const defaultState = {
  regionObj: null,
  savedTechs: null,
  deltas: null
};

const prefix = 'NU_STORE/LOCATION/';
export const setCurrentLocation = createAction(`${prefix}SET_CURRENT_LOCATION`);
export const setSavedTechs = createAction(`${prefix}SET_SAVED_TECHS`);
export const setDeltas = createAction(`${prefix}SET_DELTAS`);

export default handleActions({
  [setCurrentLocation]: (state, { payload }) => ({
    ...state,
    regionObj: payload
  }),
  [setSavedTechs]: (state, { payload }) => ({
    ...state,
    savedTechs: payload
  }),
  [setDeltas]: (state, { payload }) => ({
    ...state,
    deltas: payload
  })
}, defaultState);

// should have one thunk package all the data i need for a users session and send it up, generator

export const getinitialDelta = () => (dispatch, getState) => {
  const {
    userInfo: {
      user: {
        favorites
      }
    }
  } = getState();

  if (!Array.isArray(favorites) || !favorites.length) return dispatch(setDeltas(null)); // <--- setting this to null probable isnt a good idea because the map will be in a loading state forever

  // shouldnt be getting from favorites however it should be getting from active in atlanta
  if (favorites.length < 2) { // 0 and 1 are usless for calculation
    const sendDeltas = {
      latitudeDelta: latDelta,
      longitudeDelta: longDelta
    };
    return dispatch(setDeltas(sendDeltas));
  }

  let dataForDeltas = favorites.reduce((collection, item, index) => {
    collection.push(item.coordinate);
    return collection;
  }, []);

  dataForDeltas = getRegionForCoordinates(dataForDeltas);

  dispatch(setDeltas(dataForDeltas));
};

export const getActiveNailTechs = () => (dispatch, getState) => {
  const {
    userInfo: {
      user: {
        favorites // set favorites bc its a place holder for this
      }
    }
  } = getState();

  if (!Array.isArray(favorites) || !favorites.length) return dispatch(setSavedTechs(null));

  // shouldnt be getting from favorites however it should be getting from active in atlanta
  return dispatch(setSavedTechs(favorites));
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
