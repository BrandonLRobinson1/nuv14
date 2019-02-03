import React from 'react';
import { View, StyleSheet } from 'react-native';

/* eslint-disable */
const SectionSmall = props => (
  <View style={[styles.container, props.style]}>
    {props.children}
  </View>
);
/* eslint-enable */

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export { SectionSmall };