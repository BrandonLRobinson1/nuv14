import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../Styles';

// eslint-disable-next-line
const { NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black } = colors;

const ButtonThin = ({ onPress, buttonText }) => {
  const { buttonStyle, buttonTextStyle, buttonFlex, iconStyle, buttonTextLeft } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <View style={buttonFlex}>
        <View style={buttonTextLeft}>
          <Text style={buttonTextStyle}>
            {buttonText}
          </Text>
        </View>
        <View style={iconStyle}>
          <Icon name="chevron-right" size={30} color={NU_Blue} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: NU_White,
    marginLeft: 5,
    marginRight: 5
  },
  buttonTextStyle: {
    color: NU_Blue,
    fontSize: 16,
    fontWeight: '600',
    padding: 12
  },
  buttonFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  iconStyle: {
    flex: 1,
    alignItems: 'flex-end',
    // alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTextLeft: {
    flex: 4
  }
});

ButtonThin.propTypes = {
  onPress: propTypes.func.isRequired,
  buttonText: propTypes.string
};

ButtonThin.defaultProps = {
  buttonText: 'buttonTextNeeded'
};

export { ButtonThin };
