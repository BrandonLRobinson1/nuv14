import { handleActions, createAction } from 'redux-actions';
import { getRegionForCoordinates } from '../../helpers/helpersFunctions'; // helper function is a way to get latitiud delta and longitude delta based on a number of points/markers
import { latDelta, longDelta } from '../../helpers/helpersFunctions';

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
// export const setGeoLocation = createAction(`${prefix}SET_GEO_LOCATION`);

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
  // *** put a timeoout on the calls
  const {
    userInfo: {
      user: {
        favorites
      }
    }
  } = getState();

  if (!Array.isArray(favorites) || !favorites.length) return dispatch(setDeltas(null));

  // shouldnt be getting from favorites however it should be getting from active in atlanta
  if (favorites.length < 2) { // 0 and 1 are usless for calculation
    const sendDeltas = {
      latitudeDelta: latDelta,
      longitudeDelta: longDelta
    };
    return dispatch(setDeltas(sendDeltas));
  }

  const allFavorites = favorites.map(marker => marker.coordinate);
  const getDeltas = getRegionForCoordinates(allFavorites);
  const sendDeltas = {
    latitudeDelta: getDeltas.latitudeDelta,
    longitudeDelta: getDeltas.longitudeDelta
  };

  return dispatch(setDeltas(sendDeltas));
};

export const getActiveNailTechs = () => (dispatch, getState) => {
  const {
    userInfo: {
      user: {
        // ***** when changing refer to this dispatch for directions
        favorites // set favorites bc its a place holder for this
      }
    }
  } = getState();

  if (!Array.isArray(favorites) || !favorites.length) return dispatch(setSavedTechs(null));

  // shouldnt be getting from favorites however it should be getting from active in atlanta
  return dispatch(setSavedTechs(favorites));
};
