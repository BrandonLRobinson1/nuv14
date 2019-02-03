import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../Styles';

const { NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black, NU_Border_Grey, NU_Card_Border } = colors;

const Card = props => {
  const { CardStyles } = styles;
  const { children } = props; // eslint-disable-line
  return (
    <View style={CardStyles}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  CardStyles: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: NU_Border_Grey,
    borderBottomWidth: 0,
    shadowColor: NU_Card_Border,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
});

export { Card };
