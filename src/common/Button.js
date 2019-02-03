import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';
import { colors } from '../Styles';

// eslint-disable-next-line
const { NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black } = colors;

const Button = ({ onPress, buttonText }) => {
  const { buttonStyle, buttonTextStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={buttonTextStyle}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: NU_White,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: NU_Blue,
    marginLeft: 5,
    marginRight: 5
  },
  buttonTextStyle: {
    color: NU_Blue,
    fontSize: 16,
    fontWeight: '600',
    padding: 12,
    alignSelf: 'center'
  }
});

Button.propTypes = {
  onPress: propTypes.func.isRequired,
  buttonText: propTypes.string
};

Button.defaultProps = {
  buttonText: 'buttonTextNeeded'
};

export { Button };
