import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, Card, Input } from '../../common';
import { clearAll, addFormInfo } from '../../store/userInfo/user';
import { colors } from '../../Colors';

class Validate extends Component {
  constructor() {
    super();
    this.state = {
      verifcationCode: '',
      errorMessage: ''
    }

    this.verifyInfo = this.verifyInfo.bind(this);
  }

  verifyInfo() {
    const { verifcationCode, errorMessage } = this.state;
    console.log('verifcationCode', verifcationCode);

    // if verification fails boot them

    // if it passes
    // addFormInfo();
    Actions.tabbar();
  }



  render() {
    const { verifcationCode, errorMessage } = this.state;
    const { circleContainer, errorText } = styles; // eslint-disable-line
    return (
      <Card>

      <CardSection>
          <Text>
            We've sent a verfication code to your email or phone, enter to code to complete sign up :)
          </Text>
        </CardSection>

        <CardSection>
          <Input
            label="Verication"
            placeholder="Enter verification code"
            value={verifcationCode}
            onChangeText={text => {
              this.setState({
                verifcationCode: text,
                errorMessage: ''
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Text style={errorText}>
            {errorMessage}
          </Text>
        </CardSection>

        <CardSection>
          <Button
            buttonText="Complete Sign Up"
            onPress={() => {

              this.verifyInfo();
            }
          }
          />
        </CardSection>

      </Card>
    );
  }
}

export default connect(
  state => ({
    // HAVE THESE ALL HERE FOR TESTING PURPOSES
    firstName: state.userInfo.user.firstName,
    lastName: state.userInfo.user.lastName,
    phoneNumber: state.userInfo.user.phoneNumber,
    password: state.userInfo.user.password,
    zipCode: state.userInfo.user.zipCode,
    email: state.userInfo.user.email
  }),
  {

    clearAll,
    addFormInfo
  }
)(Validate);

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors; // eslint-disable-line

const styles = StyleSheet.create({
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
