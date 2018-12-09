import React from 'react';
import { View, StyleSheet } from 'react-native';

const FullCard = props => (
  <View style={[styles.container, props.contentStyle]}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    width: '100%',
    flexDirection: 'column'
  }
});

export { FullCard };