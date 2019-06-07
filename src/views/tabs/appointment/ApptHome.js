import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StyleSheet, Clipboard, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import CustomMarker from '../map/CustomMarker';
import { CardSection, Spinner, Card, Button } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

const { NU_Red , NU_Blue, NU_White, NU_Grey, NU_Border_Grey } = colors; // eslint-disable-line
const { horizontalFlex, NU_Paragraph_Text, NU_Small_Header_Text, leftAndRightPadding, NU_Header_Text } = commonStyles;

// eslint-disable-next-line
class ApptHome extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    const {
      imageStyle,
      imageContainer,
      flexCenter,
      mapContainer,
      background,
      noAptContainer,
      textContainer,
      buttonContainer,
      textHeaderContainer
    } = styles; // eslint-disable-line

    if (!appObj) {
      return (
        <View style={background}>
          <View style={noAptContainer}>
            <View style={textHeaderContainer}>
              <Text style={[NU_Header_Text, flexCenter]}>
                Uh-oh =/
              </Text>
            </View>
            <View style={textContainer}>
              <Text style={[NU_Paragraph_Text, flexCenter]}>
                you dont have an appointment yet
              </Text>
            </View>
            <View style={buttonContainer}>
              <Button
                buttonText="Browse Techs"
                onPress={() => {
                  Actions.DiscoverMainTab();
                  Actions.pop();
                }}
              />
            </View>
          </View>
        </View>
      );
    }

    const {
      name = '',
      time = '',
      date = '',
      street = '',
      regionObj = '',
      phoneNumber = '',
      packageChoice = '',
      uri = ''
    } = appObj;

    const {
      manicure
    } = packages;

    return (
      <ScrollView>
        <View style={leftAndRightPadding}>
          <Card>
            <CardSection>
              <View style={imageContainer}>
                <Image
                  source={{ uri }}
                  style={imageStyle}
                />
              </View>
            </CardSection>

            <CardSection>
              <View style={horizontalFlex}>
                <View style={flexCenter}>
                  <Text style={NU_Header_Text}>
                    {name}
                  </Text>
                </View>
              </View>
            </CardSection>

            <CardSection>
              <View style={horizontalFlex}>
                <View style={flexCenter}>
                  <Text style={NU_Small_Header_Text}>
                    Appointment Details
                  </Text>
                  <Text style={NU_Paragraph_Text}>
                    {date}
                    {'\n'}
                  </Text>
                  <Text style={NU_Paragraph_Text}>
                    {time}
                  </Text>
                </View>
              </View>
            </CardSection>

            <CardSection>
              <View style={horizontalFlex}>
                <View style={flexCenter}>
                  <Text style={NU_Small_Header_Text}>
                    {manicure[0].packageName}
                  </Text>
                  <Text style={NU_Paragraph_Text}>
                    {manicure[0].description}
                  </Text>
                </View>
              </View>
            </CardSection>

            <CardSection>
              <View style={horizontalFlex}>
                <View style={flexCenter}>
                  <Text style={NU_Small_Header_Text}>
                    Contact
                  </Text>
                  <Text style={NU_Paragraph_Text}>
                    {phoneNumber}
                  </Text>
                </View>
              </View>
            </CardSection>

            <CardSection>
              <View style={horizontalFlex}>

                <View style={flexCenter}>
                  <Text style={NU_Small_Header_Text}>
                    address (touch to copy)
                  </Text>

                  <Text
                    style={NU_Paragraph_Text}
                    onPress={async () => {
                      const clip = await Clipboard.setString(street);
                      return clip;
                    }}
                  >
                    {street}
                  </Text>
                </View>

                <View>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    ref={map => this.map = map} // eslint-disable-line
                    initialRegion={regionObj}
                    style={mapContainer}
                    loadingEnabled
                    zoomEnabled={false}
                    zoomControlEnabled={false}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                    moveOnMarkerPress={false}
                    onPress={() => openMap(regionObj)}
                  >

                    <MapView.Marker coordinate={regionObj}>
                      <CustomMarker />
                    </MapView.Marker>

                  </MapView>
                </View>

              </View>
            </CardSection>

          </Card>
        </View>
      </ScrollView>
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
    height: 130,
    width: 130,
    borderRadius: 65,
    margin: 2
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapContainer: {
    width: '100%',
    height: 110
  },

  background: {
    padding: 5,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  noAptContainer: {
    width: '100%',
    padding: 10,
    height: 200,
    display: 'flex',
    borderRadius: 5,
    // borderColor: NU_Card_Border,
    // borderWidth: 1
  },
  textContainer: {
    width: '100%',
    flex: 2,
    paddingLeft: 3,
    paddingRight: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHeaderContainer: {
    width: '100%',
    flex: 1,
    paddingLeft: 3,
    paddingRight: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  buttonContainer: {
    height: 50,
    width: '100%',
    marginBottom: 15
  },
  textStyle: {
    textAlign: 'center',
    padding: 10,
    fontSize: 26
  },
});

export default connect(
  state => ({
    // firstName: state.userInfo.user.firstName,
  }),
  {
    // updateFirstName,
  }
)(ApptHome);

const packages = {
  manicure: [
    {
      packageName: 'Seaside Manicure',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tokens: 97
    }
  ]
};

const appObj = null;
// const appObj = {
//   name: 'extra salon',
//   time: '12:54', // may take utc format
//   date: '12/12/19', // may take utc format
//   street: '123 davie jones drive',
//   regionObj: { latitude: 37.767, longitude: -122.421, latitudeDelta: 0.03148000000000195, longitudeDelta: 0.034317000000001485 },
//   packageChoice: 'seaside wave',
//   phoneNumber: '704-449-6636',
//   uri: 'https://media.wmagazine.com/photos/5ab3b3cd8f35206e675d7d28/4:3/w_1536/beyonce-pledges-to-build-more-wells-in-burundi.jpg'
// };
