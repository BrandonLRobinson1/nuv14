import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import SettingsTitle from './settingsItems/SettingsTitle';
import SettingsList from './settingsItems/SettingsList';
import { colors } from '../../../Styles';

const { NU_Red } = colors;

// eslint-disable-next-line
class Setting extends Component {
  constructor() {
    super();
    // this.state = {};
    this.buildSettings = this.buildSettings.bind(this);
  }

  // data will come from initital get data call

  // eslint-disable-next-line
  buildSettings(title, settingsArr) {
    return (
      <View>
        <SettingsTitle name={title} />
        {settingsArr.map((setting, index) => {
          const { name, sceneLocation } = setting;
          return <SettingsList name={name} sceneLocation={sceneLocation} key={index} />
        })}
      </View>
    );
  }

  render() {
    const {
      container,
      body,
      logOut
    } = styles; // eslint-disable-line

    const nameSettings = [
      { name: 'Account Info', sceneLocation: 'EditAccount' },
      { name: 'Change Email', sceneLocation: 'ChangeEmail' },
      { name: 'Reset Password', sceneLocation: 'ChangePassword' },
      { name: 'Change Photo', sceneLocation: 'EditAccount' }
    ];

    const privacySettings = [
      { name: 'Privacy Policy', sceneLocation: 'LegalDoc' }
    ];

    // const paymentSettings = [
    //   { name: 'CardInfo', sceneLocation: 'name' },
    //   { name: 'Plan', sceneLocation: 'name' }
    // ];

    const support = [
      { name: 'FAQ/Help Center', sceneLocation: 'FAQ' },
      { name: 'Terms and Conditions', sceneLocation: 'LegalDoc' },
      { name: 'Contact Us', sceneLocation: 'ContactUs' }
    ];

    return (
      <View style={container}>

        <View style={body}>
          <ScrollView>
            {this.buildSettings('Account', nameSettings)}
            {this.buildSettings('Privacy', privacySettings)}
            {/* {this.buildSettings('Payment Info', paymentSettings)} */}
            {this.buildSettings('Support', support)}
            <Text style={logOut}>Log Out - big red button</Text>
            <Text>Version</Text>
            <Text>need something to click to take you to billing</Text>
            <Text>This app was created by sososo group</Text>
            <Text>www.sososo.com</Text>
          </ScrollView>
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%'
  },
  body: {
    flex: 1,
    marginBottom: 5
  },
  logOut: {
    color: NU_Red
  }
});

export default connect(
  state => ({
    // favorites: state.userInfo.user.favorites,
  }),
  {
    // updateFirstName,
  }
)(Setting);
