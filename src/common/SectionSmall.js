import React from 'react';
import { View, StyleSheet } from 'react-native';

const SectionSmall = props => (
  <View style={[styles.container, props.style]}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export { SectionSmall };