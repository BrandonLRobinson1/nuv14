import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StyleSheet, FlatList } from 'react-native';
import propTypes from 'prop-types';
import Preview from '../sharedTabComp/Preview';
import { CardSection, Card, ModalView, FullCard, Spinner } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

const { NU_Blue, NU_White, NU_Grey, NU_Card_Border, NU_Border_Grey } = colors; // eslint-disable-line

// eslint-disable-next-line
class UserProfile extends Component {   // should pull a fresh copy of data everytime you land on this page so on willmount might handle
  constructor() {
    super();
    this.state = {
      tabSelected: 'favorites',
      modalTesterWillDelete: false
    };
    this.renderFavsAndHistory = this.renderFavsAndHistory.bind(this);
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
    const { modalTesterWillDelete } = this.state;

    const {
      horizontalFlex,
      NU_Paragraph_Text,
      NU_Small_Header_Text,
      flexCenter
    } = commonStyles;

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

    const { tabSelected } = this.state;
    const favSelectHistory = tabSelected === 'history' ? tabOn : tabOff;
    const favSelectFavorites = tabSelected === 'favorites' ? tabOn : tabOff;

    if (!favorites) return ( //would be checking for favorites and history
      <FullCard>
        <Spinner />
      </FullCard>
    );

    return (
      <Card>
        <View style={cardSectionFlex}>
          <CardSection>
            <View style={imageContainer}>
              <Image
                source={{ uri: 'https://i.imgur.com/K3KJ3w4h.jpg' }}
                style={imageStyle}
              />
            </View>
          </CardSection>

          <CardSection>
            <View style={horizontalFlex}>
              <View style={flexCenter}>
                <Text style={NU_Paragraph_Text}>
                  {`${firstName} ${lastName}`}
                </Text>
                <Text style={NU_Paragraph_Text}>
                  Charlotte, NC (from zip)
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


        <ModalView
          visible={modalTesterWillDelete}
          onAccept={() => console.log('accept')}
          onDecline={() => console.log('decline')}
        >
          refer Modal
        </ModalView>

      </Card>
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
    firstName: state.userInfo.user.firstName,
    lastName: state.userInfo.user.lastName,
    profilePic: state.userInfo.user.profilePic,
    dob: state.userInfo.user.dob,
    favorites: state.userInfo.user.favorites
  }),
  {
  }
)(UserProfile);
