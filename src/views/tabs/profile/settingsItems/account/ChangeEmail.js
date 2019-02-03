import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  CardSection,
  Card,
  Input,
  Spinner
} from '../../../../../common';
import { updateEmail } from '../../../../../store/userInfo/user';
import { emailRegEx } from '../../../../../helpers/helpersFunctions';
import { colors } from '../../../../../Styles';

const { NU_Red } = colors; // eslint-disable-line

class EditAccouunt extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: '',
      loading: null,
      oldEmail: '',
      newEmail1: '',
      newEmail2: ''
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  // eslint-disable-next-line
  async onButtonPress() {
    const { oldEmail, newEmail1, newEmail2 } = this.state;
    const { email } = this.props; // eslint-disable-line

    if (oldEmail !== email) return this.setState({ errorMessage: 'Old email is incorrect' });
    if (!emailRegEx(newEmail1)) return this.setState({ errorMessage: 'The new email address is badly formatted.' });
    if (newEmail1 !== newEmail2) return this.setState({ // eslint-disable-line
      errorMessage: `Email Addresses don't match`, // eslint-disable-line
      newEmail1: '',
      newEmail2: ''
    });

    // do something in redux and firebase
    this.setState({ loading: true });
  };

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
      oldEmail,
      newEmail1,
      newEmail2
    } = this.state;

    return (
      <Card>
        <CardSection>
          <Input
            label="Previos Email"
            placeholder="Previos Address"
            value={oldEmail}
            onChangeText={text => {
              this.setState({
                oldEmail: text,
                errorMessage: ''
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            label="New Email"
            placeholder="New Email Address"
            value={newEmail1}
            onChangeText={text => {
              this.setState({
                newEmail1: text,
                errorMessage: ''
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            label="New Email (Again)"
            placeholder="New Email Address (Again)"
            value={newEmail2}
            onChangeText={text => {
              this.setState({
                newEmail2: text,
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
    email: state.userInfo.user.email
  }),
  {
    updateEmail
  },
)(EditAccouunt);