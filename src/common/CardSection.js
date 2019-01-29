import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../Styles';

const CardSection = (props) => {
  const { CardSectionStyles } = styles;
    return (
      <View style={[styles.CardSectionStyles, props.style]}>
          {props.children}
      </View>
    );
};

const { NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black, NU_Border_Grey, NU_Background  } = colors

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

export { CardSection };