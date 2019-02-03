import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import propTypes from 'prop-types';


const Spinner = ({ size }) => (
  <View style={styles.spinnerSyle}>
    <ActivityIndicator size={size}/>
  </View>
);

const styles = StyleSheet.create({
  spinnerSyle: {
    flex: 1, // to fill the whole screen
    justifyContent: 'center',
    alignItems: 'center'
  }
});

Spinner.propTypes = {
  size: propTypes.string
};

Spinner.defaultProps = {
  size: 'large'
};

export { Spinner };
