import React from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

const Spinner = ({ size }) => ( //react native includes a default spinner :)
  <View style={styles.spinnerSyle}>
    <ActivityIndicator size={size || 'large'}/>
  </View>
);

const styles = StyleSheet.create({
  spinnerSyle: {
    flex: 1, // to fill the whole screen
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export { Spinner };