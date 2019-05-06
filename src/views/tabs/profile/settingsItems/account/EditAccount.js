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
import {
  updateFirstName,
  updateLastName,
  updateZipCode,
  updateUserInfo
  // setBio
} from '../../../../../store/userInfo/user';
import { allLettersRegEx, allNumbersRegEx } from '../../../../../helpers/helpersFunctions';
import { colors } from '../../../../../Styles';

class EditAccouunt extends Component {
  constructor() {
    super();
    this.state = {
      // clearTextOnFocus: false,
      errorMessage: '',
      firstName: '',
      lastName: '',
      zipCode: ''
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  componentWillMount() {
    // set local state to whats in redux
  }

  // eslint-disable-next-line
  async onButtonPress() {
    const { firstName, lastName, zipCode } = this.state;
    const { updateUserInfo } = this.props;
    // if (!allLettersRegEx(firstName) || firstName.length < 2) return this.setState({ errorMessage: 'Please Enter Valid First Name' });
    // if (!allLettersRegEx(lastName) || lastName.length < 2) return this.setState({ errorMessage: 'Please Enter Valid Last Name' });
    // if (!allNumbersRegEx(zipCode) || zipCode.length !== 5) return this.setState({ errorMessage: 'Please Enter Valid zipCode Code' });
    const userInfo = { firstName, lastName, zipCode };
    updateUserInfo(userInfo)
      .then(() => {
        Alert.alert('Success', 'Info Updated 😄');
        this.setState({
          errorMessage: '',
          firstName: '',
          lastName: '',
          zipCode: ''
        })
      })
      .catch(failedMessage => {
        console.log('hmm')
        this.setState({
          errorMessage: failedMessage,
          firstName: '',
          lastName: '',
          zipCode: ''
        });
     });
    // validate and pass to thunk to update redux and send to firebase
  }

  renderButton() {
    if (this.state.loading) { // eslint-disable-line
      return <Spinner size="large" />;
    }
    return (
      <Button
        buttonText="Update"
        onPress={() => this.onButtonPress()}
      />
    );
  }

  render() {
    const { errorText } = styles; // eslint-disable-line
    const {
      errorMessage,
      firstName,
      lastName,
      zipCode
    } = this.state;

    return (
      <Card>
        <CardSection>
          <Input
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChangeText={text => {
              this.setState({
                firstName: text,
                errorMessage: ''
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => {
              this.setState({
                lastName: text,
                errorMessage: ''
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            label="zipCode"
            placeholder="zipCode"
            value={zipCode}
            onChangeText={text => {
              this.setState({
                zipCode: text,
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

export default connect(
  state => ({
    firstName: state.userInfo.user.firstName,
    lastName: state.userInfo.user.lastName,
    zipCode: state.userInfo.user.zipCode,
    profilePic: state.userInfo.user.profilePic
    // bio: state.userInfo.user.bio
  }),
  {
    updateFirstName,
    updateLastName,
    updateZipCode,
    updateUserInfo
    // setBio
  },
)(EditAccouunt);

const { NU_Red } = colors;

const styles = StyleSheet.create({
  errorText: {
    color: NU_Red,
    width: '100%',
    display: 'flex',
    textAlign: 'center'
  }
});
