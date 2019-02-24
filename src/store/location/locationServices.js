import firebase from 'firebase';
import { handleActions, createAction } from 'redux-actions';
import { getRegionForCoordinates } from '../../helpers/helpersFunctions';
import { latDelta, longDelta } from '../../Styles';

// need to design this to grab info from every SESSION
const defaultState = {
  regionObj: null,
  activeNailTechs: null,
  deltas: null,
  loadingMapData: true
};

const prefix = 'NU_STORE/LOCATION/';
export const setCurrentLocation = createAction(`${prefix}SET_CURRENT_LOCATION`);
export const setActiveNailTechs = createAction(`${prefix}SET_ACTIVE_NAIL_TECHS`);
export const setMapLoading = createAction(`${prefix}SET_MAP_LOADING`);
export const setDeltas = createAction(`${prefix}SET_DELTAS`);

export default handleActions({
  [setCurrentLocation]: (state, { payload }) => ({
    ...state,
    regionObj: payload
  }),
  [setActiveNailTechs]: (state, { payload }) => ({
    ...state,
    activeNailTechs: payload
  }),
  [setDeltas]: (state, { payload }) => ({
    ...state,
    deltas: payload
  }),
  [setMapLoading]: (state, { payload }) => ({
    ...state,
    loadingMapData: payload
  })
}, defaultState);

// todo should have one thunk package all the data i need for a users session and send it up, generator

export const getinitialDelta = () => async (dispatch, getState) => {
  const {
    location: {
      locationServices: {
        activeNailTechs
      }
    }
  } = getState();

  const sendDeltas = {
    latitudeDelta: latDelta,
    longitudeDelta: longDelta
  };

  return dispatch(setDeltas(sendDeltas));

  if (!Array.isArray(activeNailTechs) || !activeNailTechs.length) {
    dispatch(setDeltas(null)); // <--- setting this to null probable isnt a good idea because the map will be in a loading state forever
  }

  // shouldnt be getting from favorites however it should be getting from active in atlanta
  if (activeNailTechs.length < 2) { // 0 and 1 are usless for calculation
    const sendDeltas = {
      latitudeDelta: latDelta,
      longitudeDelta: longDelta
    };
    dispatch(setDeltas(sendDeltas));
  }

  let dataForDeltas = activeNailTechs.reduce((collection, item) => {
    collection.push(item.coordinate);
    return collection;
  }, []);

  dataForDeltas = getRegionForCoordinates(dataForDeltas);

  dispatch(setDeltas(dataForDeltas));
};

export const getActiveNailTechs = () => async dispatch => {
  const { currentUser } = firebase.auth();
  return new Promise((resolve, reject) => {
    return firebase.database().ref(`/city/atlanta/testAccounts/mapDataTestData/-AAAFFFCCC/-LYN_-LGnM5AawjAnro1`)
      .on('value', snapshot => {
        console.log('done', snapshot.val());
        dispatch(setActiveNailTechs(snapshot.val()));
        dispatch(setMapLoading(false));
        resolve(true);
      },
      error => {
        console.log('err', error);
        dispatch(setMapLoading(true));
        resolve(false);
      });
  });
};
