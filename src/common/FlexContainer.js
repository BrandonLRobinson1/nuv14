import React from 'react';
import { View, StyleSheet } from 'react-native';

/* eslint-disable */
const FlexContainer = props => (
  <View style={[styles.container, props.contentStyle]}>
    {props.children}
  </View>
);
/* eslint-enable */

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column'
  }
});

export { FlexContainer };
