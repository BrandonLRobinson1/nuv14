import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StyleSheet, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import propTypes from 'prop-types';
import { userInfoFetch, getAppData } from '../../../store/userInfo/user';
import Oops from '../sharedTabComp/Oops';
import Preview from '../sharedTabComp/Preview';
import { CardSection, Card, FullCard, Spinner } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

const { NU_Blue, NU_White, NU_Grey, NU_Card_Border, NU_Border_Grey } = colors; // eslint-disable-line
const { horizontalFlex, NU_Paragraph_Text, NU_Small_Header_Text, flexCenter, leftAndRightPadding } = commonStyles;

// eslint-disable-next-line
class UserProfile extends Component {   // should pull a fresh copy of data everytime you land on this page so on willmount might handle
  constructor() {
    super();
    this.state = {
      tabSelected: 'favorites',
      modalTesterWillDelete: false,
      apiCallCounter: 0
    };

    this.renderFavsAndHistory = this.renderFavsAndHistory.bind(this);
    this.getProfileData = this.getProfileData.bind(this);
    this.refetchButton = this.refetchButton.bind(this);
  }

  componentDidMount() {
    this.getProfileData();
  }

  async getProfileData() { // eslint-disable-line
    const { getAppData, userDataLoading, appDataLoading, userInfoFetch, favorites, firstName } = this.props; // eslint-disable-line
    const { apiCallCounter } = this.state;
    const infoArrived = firstName.length > 0;
    const isArr = Array.isArray(favorites); // will be one for fav and one for history

    if (apiCallCounter >= 3 || (infoArrived && isArr)) return 0;

    console.log('hit')

    // if (userDataLoading || appDataLoading) {
    //   console.log('--loading');
    //   await this.setState({ apiCallCounter: apiCallCounter + 1 });
    //   return setTimeout(() => this.getProfileData(), 1000);
    // }

    if (!infoArrived) {
      console.log('--fetching');
      await this.setState({ apiCallCounter: apiCallCounter + 1 });
      await getAppData();
      return setTimeout(() => this.getProfileData(), 750);
    }

    if (!isArr) {
      console.log('--fetching');
      await this.setState({ apiCallCounter: apiCallCounter + 1 });
      await userInfoFetch();
      return setTimeout(() => this.getProfileData(), 750);
    }
  }

  async refetchButton() {
    await this.setState({ apiCallCounter: 0 });
    return this.getProfileData();
  }

  // componentWillMount(deletethisuneededshit) {
  //   // should actually pull a value from redux and not local state
  //   setInterval(() => {
  //     this.setState( (state) => ({ modalTesterWillDelete: !this.state.modalTesterWillDelete }) );
  //   }, 5000);
  // }

  // eslint-disable-next-line
  renderFavsAndHistory (list) {
    const { favorites } = this.props;
    const { tabSelected } = this.state;

    // TODO change favorites to list
    const addKeysToFavorites = (favorites || []).map((item, index) => ({ ...item, key: `list-key-${index}` }));

    if (favorites.length > 0 /* should be list.length */) {
      return (
        <FlatList
          data={addKeysToFavorites}
          renderItem={personData => <Preview personData={personData} />} // TODO: replace key value with personData.id
          style={leftAndRightPadding}
        />
      );
    }

    return (
      <View>
        <Text>{`nothing in ${tabSelected}.... yet :)`}</Text>
      </View>
    );
  }

  tabSelect(selected) {
    const { tabSelected } = this.state;
    return tabSelected !== selected ? this.setState({ tabSelected: selected }) : null;
  }

  // overide sectional styles for some of these so like there isnt a line between the name and the picture
  render() {
    const {
      firstName,
      lastName,
      profilePic,
      favorites
    } = this.props;

    const {
      imageStyle,
      imageContainer,
      container,
      scrollableBody,
      sectionalButtonStyle,
      dividerStyle,
      tabOff,
      tabOn,
      cardSectionFlex,
      scrollSection,
      cardMargin
    } = styles; // eslint-disable-line

    const { tabSelected, apiCallCounter } = this.state;
    const favSelectHistory = tabSelected === 'history' ? tabOn : tabOff;
    const favSelectFavorites = tabSelected === 'favorites' ? tabOn : tabOff;
    const infoArrived = firstName.length > 0;

    if (apiCallCounter >= 3) {
      return (
        <Oops
          compName="Profile Page"
          retry={() => this.refetchButton()}
        />
      );
    }

    // eslint-disable-next-line
    if (!favorites || !infoArrived) return ( // would be checking for favorites and history
      <FullCard>
        <Spinner />
      </FullCard>
    );

    return (
      <View style={leftAndRightPadding}>
        <Card>
          <View style={cardSectionFlex}>
            <CardSection>
              <View style={imageContainer}>
                <Image
                  source={{ uri: 'https://i.imgur.com/K3KJ3w4h.jpg' }}
                  style={imageStyle}
                />

                <Text onPress={() => Actions.pictureUpload()}>
                  most likely removing or putting in settings - 'change photo'
                </Text>

              </View>
            </CardSection>

            <CardSection>
              <View style={horizontalFlex}>
                <View style={flexCenter}>
                  <Text style={NU_Paragraph_Text}>
                    {`${firstName} ${lastName}`}
                  </Text>
                  <Text style={NU_Paragraph_Text}>
                    ******* Charlotte, NC (from zip)
                  </Text>
                </View>
              </View>
            </CardSection>

            <CardSection>
              <View style={[horizontalFlex, flexCenter]}>
                <View>
                  <Text style={NU_Small_Header_Text}>
                    About Me:
                  </Text>
                </View>
                <View>
                  <Text style={NU_Paragraph_Text}>
                    bio
                  </Text>
                </View>
              </View>
            </CardSection>

            <CardSection>
              <View style={[horizontalFlex, flexCenter]}>
                <View>
                  <Text style={NU_Small_Header_Text}>
                    Contact Info
                  </Text>
                </View>
                <View>
                  <Text style={NU_Paragraph_Text}>
                    stuff
                  </Text>
                </View>
              </View>
            </CardSection>

            <CardSection>
              <View style={[horizontalFlex, dividerStyle]}>
                <Text
                  style={[NU_Small_Header_Text, sectionalButtonStyle, favSelectFavorites]}
                  onPress={() => this.tabSelect('favorites')}
                >
                  Favorites
                </Text>
                <Text
                  style={[NU_Small_Header_Text, sectionalButtonStyle, favSelectHistory ]}
                  onPress={() => this.tabSelect('history')}
                >
                  History
                </Text>
              </View>
            </CardSection>

            <View style={scrollSection}>
              {this.renderFavsAndHistory(tabSelected === 'favorites' ? ['fav list'] : ['history list'])}
            </View>

          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%'
  },
  scrollableBody: {
    flex: 9
  },
  imageContainer: { // this is how to full screen an image **ORDER MATTERS************
    flex: 1,
    backgroundColor: NU_White,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: { // this is how to full screen an image **ORDER MATTERS************
    height: 90,
    width: 90,
    borderRadius: 45,
    margin: 2
  },
  dividerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  sectionalButtonStyle: {
    flex: 1,
    textAlign: 'center'
  },
  tabOff: {
    color: NU_Grey
  },
  tabOn: {
    color: NU_Blue
  },
  cardSectionFlex: {
    display: 'flex',
    height: '100%'
  },
  scrollSection: {
    flex: 1,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    marginBottom: 6,
    paddingBottom: 5,
    backgroundColor: NU_White
  }
});

/* eslint-disable */
UserProfile.propTypes = {
  firstName: propTypes.string,
  lastName: propTypes.string,
  dob: propTypes.string,
  favorites: propTypes.array
};
/* eslint-enable */

export default connect(
  state => ({
    appDataLoading: state.userInfo.user.appDataLoading,
    userDataLoading: state.userInfo.user.userDataLoading,
    firstName: state.userInfo.user.firstName,
    lastName: state.userInfo.user.lastName,
    profilePic: state.userInfo.user.profilePic,
    dob: state.userInfo.user.dob,
    favorites: state.userInfo.user.favorites
  }),
  {
    userInfoFetch,
    getAppData
  }
)(UserProfile);
