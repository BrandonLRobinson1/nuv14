import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../Colors';

const Header = (props) => {
    const { headerStyle, headerText } = styles;
    return (
      <View style={headerStyle}>
        <Text style={headerText}>
          {props.headerText}
        </Text>
      </View>
    )
}

const { NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black, NU_Header_Background, NU_Shadow } = colors

const styles = StyleSheet.create({
  headerStyle: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: NU_Header_Background,
      height: 70,
      paddingTop: 30,
      shadowColor: NU_Shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      position: 'relative'
    },
    headerText: {
      fontSize: 20
    }
  }); 
  
export { Header };