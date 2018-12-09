import React, { Component } from 'react';
// import bcrypt from 'bcrypt';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, Card, Input, Spinner } from '../../common';
import { updateEmail, updatePassword, signUserUp } from '../../store/userInfo/user';
import { emailRegEx, specialCharacterValidation } from '../../helpers/helpersFunctions';
import { colors } from '../../Colors';

class SignUpEmail extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: '',
      clearTextOnFocus: false,
      useSecondPassword: false,
      pw1: '',
      pw2: '',
      loading: null
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  async onButtonPress() {
    const { pw1, pw2, } = this.state;
    const { signUserUp, updatePassword, email } = this.props;

    // if (!emailRegEx(email)) return this.setState({ errorMessage: 'The email address is badly formatted.' });
    // if (pw1.length < 7) return this.setState({ errorMessage: 'Password must be at least 7 characters' });
    // if (!specialCharacterValidation(pw1) || !specialCharacterValidation(pw2)) return this.setState({ errorMessage: 'Password must contain at least one special character' });
    // if (pw1 !== pw2) return this.setState({
    //   errorMessage: 'Password do not match',
    //   pw1: '',
    //   pw2: '',
    //   clearTextOnFocus: true,
    //   useSecondPassword: true
    // });

    // TODO: encrtypt password save it and clear it from state
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    // updatePassword(hash);
    updatePassword(`findout how to encrypt in front end ${pw1}`);

    this.setState({ loading: true });
    await signUserUp()
      .then(() => {
        this.setState({
          pw1: '',
          pw2: ''
        });
        updatePassword(null);
        Actions.SignUp();
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log('email sign in error', err);
        this.setState({ 
          errorMessage: err.message,
          loading: false
        });
      });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button
        buttonText="Submit"
        onPress={() => this.onButtonPress()}
      />
    );
  }

  render() {
    const { circle, circleContainer, circleSelected, errorText  } = styles;
    const { clearTextOnFocus, pw1, pw2, errorMessage, useSecondPassword } = this.state;
    const { updateEmail, email } = this.props;

    return (
      <Card>

        <View style={circleContainer}>
          <View style={circleSelected} />
          <View style={circle} />
          <View style={circle} />
        </View>

        <CardSection>
          <Input
            label="Email"
            placeholder="Email Address"
            value={email}
            onChangeText={text => {
              this.setState({ errorMessage: '' });
              updateEmail(text);
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Password"
            value={pw1}
            clearTextOnFocus={clearTextOnFocus}
            onChangeText={text => {
              this.setState({
                errorMessage: '',
                pw1: text,
                clearTextOnFocus: false
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Re-Enter Password"
            value={pw2}
            clearTextOnFocus={useSecondPassword}
            onChangeText={text => {
              this.setState({
                errorMessage: '',
                pw2: text,
                useSecondPassword: false
              });
            }}
          />
        </CardSection>

        <CardSection>
          {this.renderButton()}
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
    email: state.userInfo.user.email,
    password: state.userInfo.user.password
  }),
  {
    updateEmail,
    updatePassword,
    signUserUp
  }
)(SignUpEmail);

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors; // eslint-disable-line

const styles = StyleSheet.create({
  circle: {
    height: 12,
    width: 12,
    backgroundColor: NU_Blue,
    borderRadius: 25,
    margin: 5
  },
  circleSelected: {
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
