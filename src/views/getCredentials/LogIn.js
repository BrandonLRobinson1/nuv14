import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import propTypes from 'prop-types';
import { Button, CardSection, Card, Input, Spinner } from '../../common';
import { updateLogInEmail, updateLogInPassword, logUserIn } from '../../store/logIn/logIn';
import { emailRegEx, specialCharacterValidation } from '../../helpers/helpersFunctions';
import { colors } from '../../Styles';

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors;

class LogIn extends Component {
  constructor() {
    super();

    this.state = {
      errorMessage: '',
      clearTextOnFocus: false,
      password: '',
      loading: null
    };

    this.onButtonPress = this.onButtonPress.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  // eslint-disable-next-line
  async onButtonPress() {
    const { password } = this.state;
    const { email, updateLogInPassword, logUserIn } = this.props; // eslint-disable-line
    if (!emailRegEx(email)) return this.setState({ errorMessage: 'The email address is badly formatted.' });

    updateLogInPassword(password);

    this.setState({ loading: true });

    await logUserIn()
      .then(() => {
        this.setState({
          password: ''
        });
        updateLogInPassword(null);
        this.setState({ loading: false });
        Actions.tabbar();
        console.log('logged in');
      })
      .catch(err => {
        console.log('email sign in error', err);
        this.setState({
          errorMessage: err.message,
          clearTextOnFocus: true,
          loading: false
        });
      });
  }

  renderButton() {
    const { loading } = this.state;
    if (loading) { // eslint-disable-line
      return <Spinner size="large" />;
    }
    return (
      <Button
        buttonText="Submit"
        onPress={() => this.onButtonPress()}
      />
    );
  }

  render() {
    const { errorText } = styles; // eslint-disable-line
    const { password, clearTextOnFocus, errorMessage } = this.state;
    const { email, updateLogInEmail } = this.props;

    return (
      <Card>

        <CardSection>
          <Input
            label="Email"
            placeholder="Email Address"
            value={email}
            onChangeText={text => {
              this.setState({ errorMessage: '' });
              updateLogInEmail(text);
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Password"
            value={password}
            clearTextOnFocus={clearTextOnFocus}
            onChangeText={text => {
              this.setState({
                errorMessage: '',
                password: text,
                clearTextOnFocus: false
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

const styles = StyleSheet.create({
  errorText: {
    color: NU_Red,
    width: '100%',
    display: 'flex',
    textAlign: 'center'
  }
});

LogIn.propTypes = {
  updateLogInEmail: propTypes.func.isRequired,
  email: propTypes.string
};

export default connect(
  state => ({
    email: state.logIn.logIn.email,
    password: state.logIn.logIn.password
  }),
  {
    updateLogInEmail,
    updateLogInPassword,
    logUserIn
  },
)(LogIn);
