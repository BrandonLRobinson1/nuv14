import React, { Component } from 'react';
import { Scene, Router, Actions, Text } from 'react-native-router-flux';
// import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import SignUp from './src/views/getCredentials/SignUp';
import PhoneNumber from './src/views/getCredentials/PhoneNumber';
import SignUpEmail from './src/views/getCredentials/SignUpEmail';
import LogIn from './src/views/getCredentials/LogIn';
import GetCredentials from './src/views/getCredentials/GetCredentials';
import Validate from './src/views/getCredentials/Validate';

import ApptHome from './src/views/tabs/appointment/ApptHome';

// import { getinitialDelta, getActiveNailTechs } from './src/store/location/locationServices';
import { userInfoFetch } from './src/store/userInfo/user';

import Featured from './src/views/tabs/favTab/Featured';
import ProfilePage from './src/views/tabs/favTab/ProfilePage';

import MapTab from './src/views/tabs/map/MapTab';
import SearchAddress from './src/views/tabs/map/SearchAddress';

import UserProfile from './src/views/tabs/profile/UserProfile';
import Settings from './src/views/tabs/profile/Settings';
import EditAccount from './src/views/tabs/profile/settingsItems/account/EditAccount';
import ChangeEmail from './src/views/tabs/profile/settingsItems/account/ChangeEmail';

import { colors } from './src/Colors';
// import CredentialsRouter from './src/views/getCredentials/index';

// eslint-disable-next-line
const { NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black, NU_Border_Grey, NU_Card_Border } = colors;

// conditionally render this page in sceens with a redux store that has defaults
const tabIcon = ({ focused, title }) => {
  // return (<Text style={{color: focused ? 'red' :'black'}}>{title}</Text>)
  return (<Icon name="rocket" size={20} color={NU_Red} />);
};

const StarIcon = ({ focused, title }) => {
  // console.log('😺', focused, title);
  return (<Icon name="star" size={20} color={focused ? 'white' :'green'} />);
};


class RouterComponent extends Component {

  componentWillMount() {
    const { getinitialDelta, getActiveNailTechs, userInfoFetch } = this.props;
    // TURN BACK ON TURNED OFF FOR TESTING
    userInfoFetch(); // -> on app load preferabl
   // TURN BACK ON TURNED OFF FOR TESTING


    // need to iniate here then run checks to see if data is there if not render accirdingly
  }

  render() {
    console.log('🚀 how many renders without listening to state');
    return (
      <Router>
        <Scene key="root">
{/*
          <Scene
            key="getCredentials"
            component={GetCredentials}
            title="Please Login"
            hideNavBar
            initial
          />
          <Scene
            key="Email and Password"
            component={SignUpEmail}
            title="Create Account"
            backTitle=" "
          />
          <Scene
            key="SignUp"
            component={SignUp}
            title="Welcome to NU"
            backTitle=" "
            //type="reset"
          />
          <Scene
            key="Phone Number"
            component={PhoneNumber}
            title="Phone Number"
            backTitle=" "
          />

          <Scene
            key="Validate"
            component={Validate}
            title="Validate"
            backTitle=" "
          />

          <Scene
            key="logIn"
            component={LogIn}
            title="Please Login"
            backTitle=" "
          />
*/}
          <Scene
            key="tabbar"
            tabs
            inactiveTintColor="red"
            activeTintColor="white"
            tabBarStyle={{backgroundColor: "black"}}
            type="reset"
            hideNavBar
            pressOpacity={1}
            default="mapTab"
          >

            <Scene key="featured" title="Featured" icon={StarIcon}>
              <Scene
                key="FeaturedTab"
                component={Featured}
                title="Featured"
                initial
              />
              <Scene
                key="ProfilePage"
                component={ProfilePage}
                title=""
                backTitle=" "
                hideTabBar
                // onRight={() => {
                //   Actions.pop();
                //   Actions.FeaturedTab();
                // }}
              />
            </Scene>

            <Scene key="map" title="Find a salon" icon={tabIcon}>
              <Scene
                key="mapTab"
                component={MapTab}
                title="MapTab"
                backTitle=" "
                initial
                rightTitle="Change Location"
                onRight={() => {
                  Actions.pop();
                  Actions.SearchAddress();
                }}
              />
              <Scene
                key="SearchAddress"
                component={SearchAddress}
                title="Address Search"
                backTitle=" "
              />
            </Scene>


            <Scene key="profile" title="Profile" icon={tabIcon}>
              <Scene
                key="userProfile"
                component={UserProfile}
                title="profile"
                backTitle=" "
                initial
                //  setting has to include a edit profile
                rightTitle="Settings"
                onRight={() => {
                  // Actions.pop();
                  Actions.Settings();
                }}
                leftTitle="Refer"
                onLeft={() => {
                  console.log('modal')
                }}
              />

              <Scene
                key="EditAccount"
                component={EditAccount}
                title="Edit Account"
                backTitle=" "
                //  setting has to include a edit profile
                rightTitle="Edit"
                onRight={() => {
                  // Actions.pop();
                  // Actions.Settings();
                }}
              />

              <Scene
                key="ChangeEmail"
                component={ChangeEmail}
                title="Edit Email"
                backTitle=" "
                //  setting has to include a edit profile
                rightTitle=""
                onRight={() => {
                  // Actions.pop();
                  // Actions.Settings();
                }}
              />

              <Scene
                key="Settings"
                component={Settings}
                title="Settings"
                backTitle=" "
              />

            </Scene>

            <Scene key="Appointment" title="Appointment" icon={tabIcon}>
              <Scene
                key="ApptHome"
                component={ApptHome}
                title=" "
                backTitle=" "
                initial
              />
            </Scene>

          </Scene>

        </Scene>
      </Router>
    );
  }
};


// export default connect(
//   state => ({
//   }),
//   {
//     getinitialDelta,
//     getActiveNailTechs,
//     userInfoFetch
//   }
// )(RouterComponent);

export default connect(
  state => {
    // console.log('state', state);
    return {
      // regionObj: state.location.locationServices.regionObj,
      // firstName: state.userInfo.user.firstName,
      // lastName: state.userInfo.user.lastName,
      // phoneNumber: state.userInfo.user.phoneNumber,
      // password: state.userInfo.user.password,
      // zipCode: state.userInfo.user.zipCode,
      // email: state.userInfo.user.email,
      // profilePic: state.userInfo.user.profilePic,
      // bio: state.userInfo.user.bio,
      // gender: state.userInfo.user.gender,
      // dob: state.userInfo.user.dob
    };
  },
  {
    // getinitialDelta,
    // getActiveNailTechs,
    userInfoFetch
  }
)(RouterComponent);
