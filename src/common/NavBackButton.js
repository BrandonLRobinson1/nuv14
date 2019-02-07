import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import propTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { colors } from '../Styles';

const { NU_White } = colors;

const NavBackButton = ({ leftButtonIcon = 'chevron-left', navColor = NU_White }) => (
  <Icon
    name={leftButtonIcon}
    size={33}
    color={navColor}
    onPress={() => Actions.pop()}
  />
);

NavBackButton.propTypes = {
  leftButtonIcon: propTypes.string, // eslint-disable-line
  navColor: propTypes.string        // eslint-disable-line
};

export { NavBackButton };
