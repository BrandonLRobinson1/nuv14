import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { NavBackButton } from './src/common';

import { getActiveNailTechs, setMapLoading } from './src/store/location/locationServices';
import { userInfoFetch, getAppData, setAppDataLoading, setUserInfoLoading } from './src/store/userInfo/user';

import SignUp from './src/views/getCredentials/SignUp';
import PhoneNumber from './src/views/getCredentials/PhoneNumber';
import SignUpEmail from './src/views/getCredentials/SignUpEmail';
import LogIn from './src/views/getCredentials/LogIn';
import GetCredentials from './src/views/getCredentials/GetCredentials';
import Validate from './src/views/getCredentials/Validate';

import ApptHome from './src/views/tabs/appointment/ApptHome';

import DiscoverMain from './src/views/tabs/discover/DiscoverMain';

import ProfilePage from './src/views/tabs/sharedTabComp/ProfilePage';
import Reviews from './src/views/tabs/sharedTabComp/Reviews';
// import TabBarButton from './src/views/tabs/sharedTabComp/TabBarButton';
import Options from './src/views/tabs/sharedTabComp/Options';

import MapTab from './src/views/tabs/map/MapTab';
import SearchAddress from './src/views/tabs/map/SearchAddress';

import UserProfile from './src/views/tabs/profile/UserProfile';
import Settings from './src/views/tabs/profile/Settings';
import EditAccount from './src/views/tabs/profile/settingsItems/account/EditAccount';
import ChangeEmail from './src/views/tabs/profile/settingsItems/account/ChangeEmail';

import { colors } from './src/Styles';

// eslint-disable-next-line
const { NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black, NU_Border_Grey, NU_Card_Border, NU_Green } = colors;

const tabIcon = ({ focused, title }) => <Icon name="rocket" size={20} color={NU_Red} />

const StarIcon = ({ focused, title }) => <Icon name="star" size={20} color={focused ? 'white' :'green'} />


class RouterComponent extends Component {

  componentWillMount() {
    const { getActiveNailTechs, userInfoFetch, getAppData, getinitialDelta, setMapLoading } = this.props; // eslint-disable-line
    // ******************************************************* use lodash when searching through firebase database instead of writing your own functions

    getAppData(); // --> gets info for discover page
    getActiveNailTechs(); // map --> then run initialdelta in map
    userInfoFetch(); // --> gets user data and a collection of history an favs for profile
    // **** on recalls set thier loading to true!!
  }

  render() {
    const { topNavHeaderStyle, tabBackgroundColor, HeaderTitleColor } = styles;
    console.log('🚀 how many renders without listening to state');

    return (
      <Router
        navigationBarStyle={topNavHeaderStyle}
        icon={tabIcon}
      >
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
            inactiveTintColor={NU_Red}
            activeTintColor={NU_White}
            tabBarStyle={tabBackgroundColor}
            type="reset"
            hideNavBar
            pressOpacity={1}

            titleStyle={HeaderTitleColor}
          >

            <Scene key="featured" title="Discover" icon={StarIcon} initial>
              <Scene
                key="DiscoverMainTab"
                component={DiscoverMain}
                title="Discover"
              />
              <Scene
                key="ProfilePage"
                component={ProfilePage}
                title=""
                backTitle=""
                hideTabBar
                renderLeftButton={() => <NavBackButton />}
                onLeft={() => Actions.pop()}
              />
              <Scene
                key="Reviews"
                component={Reviews}
                title="Reviews"
                backTitle=""
                onLeft={() => Actions.pop()}
              />
              <Scene
                key="Options"
                component={Options}
                title="Options"
                backTitle=""
                onLeft={() => Actions.pop()}
              />
            </Scene>

            <Scene key="map" title="Find a salon" icon={tabIcon}>
              <Scene
                key="mapTab"
                component={MapTab}
                title="MapTab"
                backTitle=""
                rightTitle="Change Location"
                onRight={() => {
                  // Actions.pop();
                  Actions.SearchAddress();
                }}
              />
              <Scene
                key="SearchAddress"
                component={SearchAddress}
                title="Address Search"
                backTitle=" "
              />
              <Scene
                key="ProfilePageMap"
                hideTabBar
                // tabBarComponent={() => <TabBarButton />}
                component={ProfilePage}
                title=""
                backTitle=""
                onLeft={() => Actions.pop()}
              />
              <Scene
                key="Reviews"
                component={Reviews}
                title="Reviews"
                backTitle=""
                onLeft={() => Actions.pop()}
              />
            </Scene>


            <Scene key="profile" title="Profile" icon={tabIcon}>
              <Scene
                key="userProfile"
                component={UserProfile}
                title="profile"
                backTitle=""
                rightTitle="Settings"
                onRight={() => {
                  // Actions.pop();
                  Actions.Settings();
                }}
                leftTitle="Refer"
                onLeft={() => console.log('modal')}
              />

              <Scene
                key="EditAccount"
                component={EditAccount}
                title="Edit Account"
                backTitle=""
                rightTitle="Edit"
              />

              <Scene
                key="ChangeEmail"
                component={ChangeEmail}
                title="Edit Email"
                backTitle=""
                rightTitle=""
              />

              <Scene
                key="Settings"
                component={Settings}
                title="Settings"
                backTitle=""
              />

              <Scene
                key="ProfilePage"
                component={ProfilePage}
                title=""
                backTitle=""
                hideTabBar
                onLeft={() => Actions.pop()}
              />

              <Scene
                key="Reviews"
                component={Reviews}
                title="Reviews"
                backTitle=" "
                onLeft={() => Actions.pop()}
              />
            </Scene>

            <Scene key="Appointment" title="Appointment" icon={tabIcon}>
              <Scene
                key="ApptHome"
                component={ApptHome}
                title=""
                backTitle=""
              />
            </Scene>

          </Scene>

        </Scene>
      </Router>
    );
  }
}


const styles = StyleSheet.create({
  topNavHeaderStyle: {
    backgroundColor: NU_Green, // changing navbar color
    color: NU_White
  },
  tabBackgroundColor: {
    backgroundColor: NU_Grey
  },

  HeaderTitleColor: {
    color: NU_White
  }
});

// export default connect(
//   state => ({
//   }),
//   {
//     getinitialDelta,
//     getActiveNailTechs,
//     userInfoFetch,
//     getAppData
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

    getActiveNailTechs,
    userInfoFetch,
    getAppData
  }
)(RouterComponent);
