import React, { Component } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  CardSection,
  Card,
  Input,
  Spinner
} from '../../../../../common';
import { updateUserPassword } from '../../../../../store/userInfo/user';
import { colors } from '../../../../../Styles';
import { specialCharacterValidation } from '../../../../../helpers/helpersFunctions';

const { NU_Red } = colors; // eslint-disable-line

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: '',
      loading: null,
      newPassword1: '',
      newPassword2: '',
      password: ''
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  // eslint-disable-next-line
  async onButtonPress() {
    // const { email, updateUserPassword } = this.props; // eslint-disable-line
    // const newInfo = {
    //   email: 'didit5@go1.com', // email to update to (can watch in firebase)
    //   // email: 'jjjjpppp@gmail.com', //
    //   // email: 'jjjjpppp@gmail.com', //
    //   password: 'findout how to encrypt in front end Password' // <-- real password!!
    //   // password: 'findout how to encrypt in front en'
    // };
    // return updateUserPassword(newInfo)
    //   .then(() => Alert.alert('Success', 'Email Updated 😄'))
    //   .catch(failedMessage => Alert.alert('Uh Oh!', failedMessage));
    // above is for quick and dirty testing 🌩️

    // TODO:  🔥make sure all inputs are trimmed otherwise users will get frustrated for result that dont match ❌
    const { newPassword1, newPassword2, password } = this.state;
    const { updateUserPassword } = this.props; // eslint-disable-line

    if (newPassword1.length < 7) return this.setState({ errorMessage: 'New password must be at least 7 characters' });
    if (!specialCharacterValidation(newPassword1) || !specialCharacterValidation(newPassword2)) return this.setState({ errorMessage: 'Password must contain at least one special character' });
    if (newPassword1 !== newPassword2) return this.setState({
      errorMessage: 'New passwords do not match',
      newPassword1: '',
      newPassword2: ''
    });

    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    // updatePassword(hash);

    // do something in redux and firebase
    // this.setState({ loading: true });

    const newInfo = {
      newPassword: newPassword1,
      password
    };

    console.log('newInfo', newInfo);
    updateUserPassword(newInfo)
      .then(() => {
        Alert.alert('Success', 'Password Updated 😄');
        this.setState({
          loading: null,
          newPassword1: '',
          newPassword2: '',
          password: ''
        });
      })
      .catch(failedMessage => {
        // Alert.alert('Uh Oh!', failedMessage);
        this.setState({
          errorMessage: failedMessage,
          loading: null,
          newPassword1: '',
          newPassword2: '',
          password: ''
        });
      });
    // // TODO: maybe auto sign out after five atempts and TRIM()!!!!
  }

  renderButton() {
    if (this.state.loading) { // eslint-disable-line
      return <Spinner size="large" />;
    }
    return (
      <Button
        buttonText="Verify"
        onPress={() => this.onButtonPress()}
      />
    );
  }

  render() {
    const { errorText } = styles; // eslint-disable-line
    const {
      errorMessage,
      newPassword1,
      newPassword2,
      password
    } = this.state;

    return (
      <Card>

        <CardSection>
          <Input
            secureTextEntry
            label="password"
            placeholder="previous password"
            value={password}
            onChangeText={text => {
              this.setState({
                password: text,
                errorMessage: ''
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="New Password"
            placeholder="New Password (Again)"
            value={newPassword1}
            onChangeText={text => {
              this.setState({
                newPassword1: text,
                errorMessage: ''
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="New Email (Again)"
            placeholder="New Email Address (Again)"
            value={newPassword2}
            onChangeText={text => {
              this.setState({
                newPassword2: text,
                errorMessage: ''
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

export default connect(
  state => ({
  }),
  {
    updateUserPassword
  },
)(ChangePassword);
