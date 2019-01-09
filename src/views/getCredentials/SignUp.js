import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, Card, Input } from '../../common';
import { updateFirstName, updateLastName, updateZipCode } from '../../store/userInfo/user';
import { allLettersRegEx, allNumbersRegEx, specialCharacterValidation} from '../../helpers/helpersFunctions';
import { colors } from '../../Styles';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: ''
    };
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    const { firstName, lastName, zipCode } = this.props;
    if (!allLettersRegEx(firstName)) return this.setState({ errorMessage: 'Please Enter Valid First Name' });
    if (!allLettersRegEx(lastName)) return this.setState({ errorMessage: 'Please Enter Valid Last Name' });
    if (!allNumbersRegEx(zipCode)) return this.setState({ errorMessage: 'Please Enter Valid Zip Code' });
    return Actions['Phone Number']();
  }

  render() {
    const { circle, circleContainer, circleSelected, errorText } = styles;
    const { updateFirstName, updateLastName, firstName, lastName, updateZipCode, zipCode } = this.props;
    const { errorMessage } = this.state;

    return (
      <Card>

        <View style={circleContainer}>
          <View style={circle} />
          <View style={circleSelected} />
          <View style={circle} />
        </View>

        <CardSection>
          <Input
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChangeText={text => {
              this.setState({ errorMessage: '' });
              updateFirstName(text);
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => {
              this.setState({ errorMessage: '' });
              updateLastName(text);
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Zip Code"
            placeholder="Zip Code"
            value={zipCode}
            keyboardType="numeric"
            onChangeText={text => {
              this.setState({ errorMessage: '' });
              updateZipCode(text);
            }}
            maxLength={5}
          />
        </CardSection>

        <CardSection>
          <Button
            buttonText="Next"
            onPress={() => this.onButtonPress()}
          />
        </CardSection>

        <CardSection>
          <Text style={errorText}>
            {errorMessage}
          </Text>
        </CardSection>

      </Card>
    );
  }
}

export default connect(
  state => ({
    firstName: state.userInfo.user.firstName,
    lastName: state.userInfo.user.lastName,
    zipCode: state.userInfo.user.zipCode
  }),
  {
    updateFirstName,
    updateLastName,
    updateZipCode
  }
)(SignUp);

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors

const styles = StyleSheet.create({
  circle: {
    height: 12,
    width: 12,
    backgroundColor: NU_Blue,
    borderRadius: 25,
    margin: 5
  },
  circleSelected:{
    height: 12,
    width: 12,
    backgroundColor: NU_Red,
    borderRadius: 25,
    margin: 5
  },
  circleContainer: {
    height: '13%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: NU_Grey
  },
  errorText: {
    color: NU_Red,
    width: '100%',
    display: 'flex',
    textAlign: 'center'
  }
});
