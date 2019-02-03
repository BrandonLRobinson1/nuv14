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

// eslint-disable-next-line
class Setting extends Component {
  constructor() {
    super();
    // this.state = {};
    this.buildSettings = this.buildSettings.bind(this);
  }

  // eslint-disable-next-line
  buildSettings(title, settingsArr) {
    return (
      <View>
        <SettingsTitle name={title} />
        {settingsArr.map((setting, i) => {
          const { name, sceneLocation } = setting;
          return <SettingsList name={name} sceneLocation={sceneLocation} key={`${name}-${i}`} />
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
      { name: 'Reset Password', sceneLocation: 'EditAccount' },
      { name: 'Change Photo', sceneLocation: 'EditAccount' },
    ];

    const privacySettings = [
      { name: 'Privacy', sceneLocation: 'name' }
    ];

    const paymentSettings = [
      { name: 'CardInfo', sceneLocation: 'name' },
      { name: 'Plan', sceneLocation: 'name' }
    ];

    const support = [
      { name: 'Help Center', sceneLocation: 'name'},
      { name: 'Terms and Conditions', sceneLocation: 'thingA' },
      { name: 'Privacy Policy', sceneLocation: 'thingB' },
      { name: 'Email Us', sceneLocation: 'thingB' }
    ];

    return (
      <View style={container}>

        <View style={body}>
          <ScrollView>
            {this.buildSettings('Account', nameSettings)}
            {this.buildSettings('Privacy', privacySettings)}
            {this.buildSettings('Payment Info', paymentSettings)}
            {this.buildSettings('Support', support)}
            <Text style={logOut}>Log Out</Text>
            <Text>Version</Text>
          </ScrollView>
        </View>

      </View>
    );
  }
};

export default connect(
  state => ({
    // favorites: state.userInfo.user.favorites,
  }),
  {
    // updateFirstName,
  }
)(Setting);

const { NU_Red } = colors;

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
