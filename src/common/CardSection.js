import React from 'react';
import { View, StyleSheet } from 'react-native';
import propTypes from 'prop-types';
import { colors } from '../Styles';

const { NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black, NU_Border_Grey, NU_Background  } = colors;

const CardSection = props => {
  const { CardSectionStyles } = styles;
  const { children, style = null } = props; // eslint-disable-line
  return (
    <View style={[CardSectionStyles, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  CardSectionStyles: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: NU_Background,
    justifyContent: 'flex-start',
    borderColor: NU_Border_Grey,
    flexDirection: 'row',
    position: 'relative'
  }
});

CardSection.propTypes = {
  style: propTypes.func.object // eslint-disable-line
};

export { CardSection };
