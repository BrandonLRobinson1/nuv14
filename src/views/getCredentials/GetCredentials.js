import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Button,
  CardSection,
  FullCard,
  SectionSmall
} from '../../common';
import { colors } from '../../Colors';

const GetCredentials = () => {
  // eslint-disable-next-line
  const { align, buttonSection, buttonPadding, buttonPlacement, textStyle } = styles;
  return (
    <FullCard>

      <SectionSmall style={align}>
        <Text style={textStyle}>
          fill in later
        </Text>
      </SectionSmall>

      <SectionSmall style={align}>
        <Text style={textStyle}>
          fill in later
        </Text>
      </SectionSmall>

      <SectionSmall style={buttonSection}>
        <View style={buttonPadding} />
        <View style={buttonPlacement}>
          <CardSection>
            <Button
              buttonText="Log In"
              onPress={() => Actions.logIn()}
            />
          </CardSection>
          <CardSection>
            <Button
              buttonText="Sign Up"
              onPress={() => Actions["Email and Password"]()}
            />
          </CardSection>
        </View>
      </SectionSmall>

    </FullCard>
  );
};

export default GetCredentials;

// eslint-disable-next-line
const { NU_Red , NU_Blue, NU_White } = colors;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    color: NU_White
  },
  align: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: NU_Blue
  },
  buttonSection: {
    flex: 1,
    backgroundColor: NU_White,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  buttonPadding: {
    flex: 2
  },
  buttonPlacement: {
    flex: 3
  }
});
