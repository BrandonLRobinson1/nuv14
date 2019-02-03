import React from 'react';
import { View, StyleSheet } from 'react-native';

const FlexContainer = props => (
  <View style={[styles.container, props.contentStyle]}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column'
  }
});

export { FlexContainer };
