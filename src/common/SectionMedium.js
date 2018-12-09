import React from 'react';
import { View, StyleSheet } from 'react-native';

const SectionMedium = props => (
  <View style={[styles.container, props.style]}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 2
  }
});

export { SectionMedium };