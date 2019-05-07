// this is a sorry something went wrong pag as seen in dicover with incorrect ref response
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import propTypes from 'prop-types';
import { FullCard, CardSection, Card, Button } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

// eslint-disable-next-line
const { NU_Card_Border, NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black, NU_Border_Grey, NU_Background  } = colors;

// props - component name to say "map" is cant connect, retry, and on click
const Oops = ({ compName, retry }) => {
  const { NU_Header_Text, NU_Paragraph_Text } = commonStyles;
  const { background, oopsContainer, textContainer, buttonContainer, centerText, textHeaderContainer } = styles;
  return (
    <View style={background}>
      <View style={oopsContainer}>
        <View style={textHeaderContainer}>
          <Text style={[NU_Header_Text, centerText]}>
            Uh-oh =/
          </Text>
        </View>
        <View style={textContainer}>
          <Text style={[NU_Paragraph_Text, centerText]}>
            {`seems like the ${compName} is not connected to the internet =/`}
          </Text>
        </View>
        <View style={buttonContainer}>
          <Button
            buttonText="Try Again"
            onPress={() => retry()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    padding: 5,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  oopsContainer: {
    width: '100%',
    padding: 10,
    height: 200,
    display: 'flex',
    borderRadius: 5,
    // borderColor: NU_Card_Border,
    // borderWidth: 1
  },
  textContainer: {
    width: '100%',
    flex: 2,
    paddingLeft: 3,
    paddingRight: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHeaderContainer: {
    width: '100%',
    flex: 1,
    paddingLeft: 3,
    paddingRight: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  buttonContainer: {
    height: 50,
    width: '100%',
    marginBottom: 15
  },
  textStyle: {
    textAlign: 'center',
    padding: 10,
    fontSize: 26
  },
  centerText: {
    textAlign: 'center',
    marginLeft: 3,
    marginRight: 3
  }
});

Oops.propTypes = {
  retry: propTypes.func.isRequired,
  compName: propTypes.string.isRequired
};

export default Oops;
