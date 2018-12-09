import { handleActions, createAction } from 'redux-actions';
import { Dimensions } from 'react-native';
import { getRegionForCoordinates } from '../../helpers/helpersFunctions'; // helper function is a way to get latitiud delta and longitude delta based on a number of points/markers

// *****
const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latDelta = 0.0622; // 0.0922
const longDelta = aspectRatio * latDelta;
// *****

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

  console.log('getinitialDelta favorites state', favorites, getState());

  if (!Array.isArray(favorites)) return dispatch(setDeltas(null));

  // 0 and 1 are usless for calculation
  if (favorites.length < 2) {
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
  /*
  const sfMarker = [
    {
      coordinate: {
        latitude: 37.771096,
        longitude: -122.397195,
      },
      title: 'Second Best Place',
      description: 'This is the second best place in Portland',
      image: Images[1],
    }
  ];
  */
};

export const getActiveNailTechs = () => (dispatch, getState) => {
// *** put a timeoout on the calls bc theyre called every 4 seconds
  const Images = [
    { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
    { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
    { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
    { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
  ];

  const {
    userInfo: {
      user: {
        // ***** when changing refer to this dispatch for directions
        favorites // set favorites bc its a place holder for this
      }
    }
  } = getState();

  if (Array.isArray(favorites)) {
    if (!favorites.length) setSavedTechs('no active users');
    const massagedData = [];
    favorites.map((person, i) => {
      person.image = Images[i];
      person.title = `best place ${i}x`;
      person.description = 'This is the best place in Portland';
      massagedData.push(person);
    });
    return dispatch(setSavedTechs(massagedData));
  }
  return dispatch(setSavedTechs(null));

  /*
  const sfMarker = [
    {
      coordinate: {
        latitude: 37.771096,
        longitude: -122.397195,
      },
      title: 'Second Best Place',
      description: 'This is the second best place in Portland',
      image: Images[1],
    }
  ];

  // careful with variable name here!!!!!!!!!!!!!!!! ALSO find a way to avoid this when creating users
  const markers = sfMarkers;
  return markers;
  */
};
