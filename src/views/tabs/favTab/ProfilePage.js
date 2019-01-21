import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StyleSheet, Dimensions, ScrollView, ListView, TouchableOpacity, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomMarker from '../map/CustomMarker';
import { createRating } from '../../../helpers/helpersFunctions';
import { CardSection, Spinner, Card } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

// maybe favorites and available

// 🤯 will be grabbing the region obj from the nail tech info when its created
//   -> actually might be passed in as a prop not sure yet, or import { regionObj } from '../../../store/location/nailTECKSTORE';
const regionObj = {latitude: 37.767, longitude: -122.421, latitudeDelta: 0.03148000000000195, longitudeDelta: 0.034317000000001485}

// eslint-disable-next-line
class ProfilePage extends Component {

  render() {
    const {
      NU_Header_Text,
      horizontalFlex,
      NU_Paragraph_Text,
      NU_Small_Header_Text
    } = commonStyles;
    const {
      imageStyle,
      imageContainer,
      container,
      mapContainer,
      scrollableBody,
      stickyBottom,
      customAppointmentButton,
      customAppointmentButtonText,
      imageCardSectionContainer,
      starRow,
      starIndiv,
      starSpace,
      reviewText
    } = styles; // eslint-disable-line

    const { NU_White, NU_Red} = colors;
    const { title, description, address: { street } } = this.props.personData; // eslint-disable-line

    const starGenerator = (score) => {
      if(!score || score === 0 || score > 5) return (<Text>No Reviews yet, be the first!</Text>) // with styling
      const ratingArray = createRating(score);

      return (
        <View style={starIndiv}>
          <View style={starSpace}>
            <Icon name={ratingArray[0] || null} size={20} color={NU_Red} />
          </View>
          <View style={starSpace}>
            <Icon name={ratingArray[1] || null} size={20} color={NU_Red} />
          </View>
          <View style={starSpace}>
            <Icon name={ratingArray[2] || null} size={20} color={NU_Red} />
          </View>
          <View style={starSpace}>
            <Icon name={ratingArray[3] || null} size={20} color={NU_Red} />
          </View>
          <View style={starSpace}>
            <Icon name={ratingArray[4] || null} size={20} color={NU_Red} />
          </View>
        </View>
      );
    }

    return (
      <View style={container}>

        <View style={scrollableBody}>
          <ScrollView>
            <Card>
              <CardSection style={[imageCardSectionContainer]}>
                <View style={imageContainer}>
                  <Image
                    source={{uri: "https://i.imgur.com/K3KJ3w4h.jpg"}}
                    style={imageStyle}
                  />
                </View>
              </CardSection>

              <Text>above scrolls for more pics</Text>

              <CardSection>
                <View style={horizontalFlex}>
                  <View>
                    <Text style={NU_Header_Text}>
                      {title}
                    </Text>
                  </View>

                  <View>
                    <Text style={NU_Paragraph_Text}>
                      {description}
                    </Text>
                  </View>
                </View>
              </CardSection>

              <CardSection>
                <View style={horizontalFlex}>

                  <View>
                    <Text style={NU_Small_Header_Text}>
                      address
                    </Text>
                  </View>

                  <View>
                    <Text style={NU_Paragraph_Text}>
                      {street}
                    </Text>
                  </View>

                  <View onPress={() => console.log('react-native-open-maps')}>
                    {/* TODO write function to conditionally render mapview based on if regionOBJ is available -> also see if there is a better way to determine mapContainer hieght */}
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
                    >

                    <MapView.Marker coordinate={regionObj}>
                      <CustomMarker />
                    </MapView.Marker>

                    </MapView>
                </View>

                </View>

              </CardSection>

              <CardSection>
                <View style={horizontalFlex}>
                  <View>
                    <Text style={NU_Small_Header_Text}>
                      Ratings
                    </Text>
                  </View>
                  <View style={starRow}>
                    {starGenerator(3.4)}
                  </View>
                  <View onPress={() => {console.log('go to review page')}}>
                    <Text style={reviewText}>
                      see reviews
                    </Text>
                  </View>
                </View>
              </CardSection>

              <CardSection>
                <View style={horizontalFlex}>
                  <View>
                    <Text style={NU_Small_Header_Text}>
                      Services
                    </Text>
                  </View>
                  <View>
                    <Text style={NU_Paragraph_Text}>
                      blocklist of services
                    </Text>
                  </View>
                </View>
              </CardSection>

              <CardSection>
                <View style={horizontalFlex}>
                  <View>
                    <Text style={NU_Small_Header_Text}>
                      hours
                    </Text>
                  </View>
                  <View>
                    <Text style={NU_Paragraph_Text}>
                      hours
                    </Text>
                  </View>
                </View>
              </CardSection>

              <CardSection>
                <View>
                  <Text>
                    add to favorites
                  </Text>
                </View>
              </CardSection>

            </Card>
          </ScrollView>
        </View>

        <View style={stickyBottom}>
          <TouchableOpacity style={customAppointmentButton}>
            <Text style={customAppointmentButtonText}>
              nooo lisa.. whyyyy
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    ); // TODO change if statements to if (!this.props.keyname)
  }
};

export default connect(
  state => ({
    // firstName: state.userInfo.user.firstName,
  }),
  {
    // updateFirstName,
  }
)(ProfilePage);

const { NU_Red , NU_Blue, NU_White, NU_Grey, NU_Border_Grey, NU_Transparent } = colors; // eslint-disable-line

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%'
  },
  mapContainer: {
    width: '100%',
    height: 110
  },
  scrollableBody: {
    flex: 9
    // marginBottom: 5
  },
  stickyBottom: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  customAppointmentButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: NU_White,
    borderColor: NU_Blue,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  customAppointmentButtonText: {
    color: NU_Blue,
    fontSize: 16,
    fontWeight: '600',
    padding: 12
  },
  imageCardSectionContainer: {
    padding: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
    shadowColor: NU_Border_Grey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    // borderWidth: 1,
    // borderColor: NU_Border_Grey
  },
  imageContainer: {
    minHeight: 235,
    flex: 2,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: NU_White,
    // shadowColor: NU_Border_Grey,
    // shadowOffset: { width: 0, height: 2 },
  },
  imageStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: NU_White,
    resizeMode: 'cover'
  },
  starRow: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'flex'
  },
  starIndiv: {
    flexDirection: 'row'
  },
  starSpace: {
    margin: 2,
    padding: 2
  },
  reviewText: {
    color: NU_Blue,
    textDecorationLine: 'underline'
  }
});
