import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; // https://www.npmjs.com/package/react-native-google-places-autocomplete
import { setCurrentLocation, setSavedTechs } from '../../../store/location/locationServices';
import propTypes from 'prop-types';
import { placesKey } from '../../../../private';
import { colors } from '../../../Styles';

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors; // eslint-disable-line

// eslint-disable-next-line
class SearchAddress extends Component {
  // THIS COMPONENT WILL ALSO BE USED FOR TECHS TO SAVE THIER CORRECT ADDRESS IN THE SYSTEM

  // componentDidMount() {
  //   // cache currernt map data, markers, poistion etc
  // }

  render() {
    // const { textInputContainer, textInput, predefinedPlacesDescription } = styles;
    const { setCurrentLocation , setSavedTechs} = this.props; // eslint-disable-line
    return (
      <GooglePlacesAutocomplete
        placeholder="Enter Address"
        minLength={2}
        autoFocus={false}
        returnKeyType="search"
        fetchDetails
        currentLocation={false}
        currentLocationLabel="Current location"
        debounce={200}
        renderDescription={row => row.description}
        onPress={async (data, details = null) => {
          // 'details' is provided when fetchDetails = true
          const dt = new Date();
          const utcDate = dt.toUTCString();
          const locationToSearch = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            timeStamp: utcDate
          };
          await setCurrentLocation(locationToSearch);
          // TODO: rerun and await new get markers function for fresh refresh
          await setSavedTechs([]);
          return Actions.mapTab();
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: placesKey,
          types: 'address' // ** reponsible for filtering results
        }}
        styles={styles}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 16
  },
  predefinedPlacesDescription: {
    color: '#1faadb'
  }
});

SearchAddress.propTypes = {
  setCurrentLocation: propTypes.func.isRequired,
  setSavedTechs: propTypes.func.isRequired
};

export default connect(
  state => ({

  }),
  {
    setCurrentLocation,
    setSavedTechs
  }
)(SearchAddress);
