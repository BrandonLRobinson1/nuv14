import React from 'react';
import { View, StyleSheet } from 'react-native';
import propTypes from 'prop-types';

const FullCard = props => {
  const { contentStyle, children } = props; // eslint-disable-line
  const { container } = styles;
  return (
    <View style={[container, contentStyle]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    width: '100%',
    flexDirection: 'column'
  }
});

FullCard.propTypes = {
  contentStyle: propTypes.object // eslint-disable-line
};

export { FullCard };
