import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Spinner, Card } from '../../../common';
import { colors, commonStyles } from '../../../Colors';


// eslint-disable-next-line
class ApptHome extends Component {
  constructor() {
    super();

  }

  render() {
    const {
      // NU_Header_Text,
      horizontalFlex,
      NU_Paragraph_Text,
      NU_Small_Header_Text
    } = commonStyles;
    const {
      imageStyle,
      imageContainer,
      flexCenter
      // container,
      // scrollableBody,
      // sectionalButtonStyle,
      // dividerStyle,
      // tabOff,
      // tabOn,
      // stickyBottom,
      // customAppointmentButton,
      // customAppointmentButtonText
    } = styles; // eslint-disable-line

    return (

      <Card>
        <CardSection>
          <View style={imageContainer}>
            <Image
              source={{uri: 'https://media.wmagazine.com/photos/5ab3b3cd8f35206e675d7d28/4:3/w_1536/beyonce-pledges-to-build-more-wells-in-burundi.jpg'}}
              style={imageStyle}
            />
          </View>
        </CardSection>

        <CardSection>
          <View style={horizontalFlex}>
            <View style={flexCenter}>
              <Text>
                Brandon Robinson
              </Text>
              <Text>
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
                appointment info
              </Text>
            </View>
          </View>
        </CardSection>

        <CardSection>
          <Text onPress={() => this.requestCameraPermission('camera')}>Path to QR code</Text>
        </CardSection>

      </Card>

    ); // TODO change if statements to if (!this.props.keyname)
  }
}

export default connect(
  state => ({
    // firstName: state.userInfo.user.firstName,
  }),
  {
    // updateFirstName,
  }
)(ApptHome);

const { NU_Red , NU_Blue, NU_White, NU_Grey, NU_Border_Grey } = colors; // eslint-disable-line

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%'
  },
  scrollableBody: {
    flex: 9
    // marginBottom: 5
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
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center'
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
  }
});
