import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StyleSheet } from 'react-native';
import { CardSection, Spinner, Card } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

const { NU_Red , NU_Blue, NU_White, NU_Grey, NU_Border_Grey } = colors; // eslint-disable-line
const { horizontalFlex, NU_Paragraph_Text, NU_Small_Header_Text, leftAndRightPadding } = commonStyles;

// eslint-disable-next-line
class ApptHome extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    const {
      imageStyle,
      imageContainer,
      flexCenter
    } = styles; // eslint-disable-line

    return (
      <View style={leftAndRightPadding}>
        <Card>
          <CardSection>
            <View style={imageContainer}>
              <Image
                source={{ uri: 'https://media.wmagazine.com/photos/5ab3b3cd8f35206e675d7d28/4:3/w_1536/beyonce-pledges-to-build-more-wells-in-burundi.jpg' }}
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
                  appointment info
                </Text>
              </View>
            </View>
          </CardSection>

          <CardSection>
            <Text onPress={() => this.requestCameraPermission('camera')}>Path to QR code</Text>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: { // this is how to full screen an image **ORDER MATTERS**************************
    flex: 1,
    backgroundColor: NU_White,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: { // this is how to full screen an image **ORDER MATTERS****************************
    height: 90,
    width: 90,
    borderRadius: 45,
    margin: 2
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default connect(
  state => ({
    // firstName: state.userInfo.user.firstName,
  }),
  {
    // updateFirstName,
  }
)(ApptHome);
