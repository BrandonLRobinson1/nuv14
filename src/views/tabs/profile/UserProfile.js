import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import Featured from '../favTab/Featured';
import { CardSection, Card, ModalView } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

// maybe favorites and available

// eslint-disable-next-line
class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      tabSelected: 'favorites',
      modalTesterWillDelete: false
    };
    // this.renderFavsAndHistory = this.renderFavsAndHistory.bind(this);
  }

  // eslint-disable-next-line
  // renderFavsAndHistory () {
  //   // can conditionally send props based upon what is selected - send history or favorites and when the info is ready itll load
  //   return (
  //     <Featured />
  //   );
  // }

  componentWillMount(deletethisuneededshit) {
    // should actually pull a value from redux and not local state
    // setInterval(() => {
    //   this.setState( (state) => ({ modalTesterWillDelete: !this.state.modalTesterWillDelete }) );
    // }, 5000);
  }

  tabSelect(selected) {
    const { tabSelected } = this.state;
    return tabSelected !== selected ? this.setState({ tabSelected: selected }) : null;
  }

  // should pull a fresh copy everytime you land on this page so on willmount might handle

  // overide sectional styles for some of these so like there isnt a line between the name and the picture
  render() {
    const {
      horizontalFlex,
      NU_Paragraph_Text,
      NU_Small_Header_Text,
      flexCenter
    } = commonStyles;

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

    return (
      <Card>

        <View style={cardSectionFlex}>

          <CardSection>
            <View style={imageContainer}>
              <Image
                source={{uri: 'https://i.imgur.com/K3KJ3w4h.jpg'}}
                style={imageStyle}
              />
            </View>
          </CardSection>

          <CardSection>
            <View style={horizontalFlex}>
              <View style={flexCenter}>
                <Text style={NU_Paragraph_Text}>
                  Brandon Robinson
                </Text>
                <Text style={NU_Paragraph_Text}>
                  Charlotte, NC
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
                  stuff
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
            <Featured dataToRender={false} />
          </View>

        </View>

        <ModalView visible={this.state.modalTesterWillDelete}>
          refer Modal
        </ModalView>

      </Card>
    ); // TODO change if statements to if (!this.props.keyname)
  }
};

export default connect(
  state => ({
    favorites: state.userInfo.user.favorites,
  }),
  {
  }
)(UserProfile);

const { NU_Blue, NU_White, NU_Grey, NU_Card_Border, NU_Border_Grey } = colors; // eslint-disable-line

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%'
  },
  scrollableBody: {
    flex: 9
  },
  imageContainer: { // this is how you would full screen an image **ORDER MATTERS****************************
    flex: 1,
    backgroundColor: NU_White,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: { // this is how you would full screen an image **ORDER MATTERS****************************
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
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: NU_Border_Grey,
    // shadowOffset: {width: 0, height: 2},
    // shadowColor: NU_Card_Border,
  }
});
