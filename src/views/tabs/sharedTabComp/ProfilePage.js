import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, Clipboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import propTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import Swiper from 'react-native-web-swiper';
import CustomMarker from '../map/CustomMarker';
import StarReview from './StarReview';
import { CardSection, Card } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

const { NU_Red , NU_Blue, NU_White, NU_Grey, NU_Border_Grey, NU_Transparent } = colors; // eslint-disable-line
const { NU_Header_Text, horizontalFlex, NU_Paragraph_Text, NU_Small_Header_Text, leftAndRightPadding } = commonStyles;

// 🤯 will be grabbing the region obj from the nail tech info when its created
// -> actually might be passed in as a prop not sure yet, or import { regionObj } from '../../../store/location/nailTECKSTORE';
const regionObj = { latitude: 37.767, longitude: -122.421, latitudeDelta: 0.03148000000000195, longitudeDelta: 0.034317000000001485 };

// eslint-disable-next-line
class ProfilePage extends Component {

  slideShow = () => {
    const {
      imageStyle,
      imageContainer,
      slideContainer,
      defaultSlide,
      invisible,
      activeDot,
      nonActiveDot
    } = styles; // eslint-disable-line

    const itachi = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLgejngJJnK5fqFKvTtZOp21aGI9GBkYtXKIq3Y9wIF25kbGYZJQ';
    // TODO uri will come from firebase server off the users profile
    const uriArray = [itachi, 'https://i.imgur.com/K3KJ3w4h.jpg'];
    // const uriArray = [];
    if (!uriArray.length) return (
      <View style={[slideContainer, defaultSlide]}>
        <Text>Slide 1</Text>
      </View>
    );

    return (
      <Swiper
        nextButtonStyle={invisible}
        prevButtonStyle={invisible}
        activeDotStyle={activeDot}
        dotStyle={nonActiveDot}
      >
        {uriArray.map((uri, key) => (
          <View style={imageContainer} key={key}>
            <Image
              source={{ uri }}
              style={imageStyle}
            />
          </View>
        ))}
      </Swiper>
    );
  }

  render() {
    const {
      container,
      mapContainer,
      scrollableBody,
      stickyBottom,
      customAppointmentButton,
      customAppointmentButtonText,
      imageCardSectionContainer,
      starRow,
      reviewText
    } = styles; // eslint-disable-line

    // paste from clipboard
    // const clipboardContent = Clipboard.getString();

    const { title, description, address: { street }, ratings } = this.props.personData; // eslint-disable-line
    const starRating = 3.4; // TODO SHOULD COME FROM THIS.PROPS.PERSONDATA;

    return (
      <View style={[container, leftAndRightPadding]}>

        <View style={scrollableBody}>
          <ScrollView>
            <Card>
              <CardSection style={[imageCardSectionContainer]}>
                {this.slideShow()}
              </CardSection>

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
                      address (touch to copy)
                    </Text>
                  </View>

                  <View>
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

              <CardSection>
                <View style={horizontalFlex}>
                  <View>
                    <Text style={NU_Small_Header_Text}>
                      Ratings
                    </Text>
                  </View>
                  <View style={starRow}>
                    <StarReview color={NU_Red} size={20} score={starRating} />
                  </View>
                  <View>
                    <Text
                      onPress={() => Actions.Reviews(
                        {
                          reviews: ratings,
                          ratingAvg: starRating,
                          title
                        })
                      }
                      style={reviewText}
                    >
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
          <TouchableOpacity
            style={customAppointmentButton}
            onPress={() => Actions.Options({
              times: ['TODO **********times Arr', 'time'],
              title,
            })}
            >
            <Text style={customAppointmentButtonText}>
              View Schedule
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

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
    minHeight: 235
  },
  imageContainer: {
    minHeight: 235,
    flex: 2,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: NU_White
  },
  imageStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: NU_White,
    resizeMode: 'cover'
  },
  // starRow: {
  //   backgroundColor: 'green',
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  //   display: 'flex'
  // },
  reviewText: {
    color: NU_Blue,
    textDecorationLine: 'underline'
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  defaultSlide: {
    backgroundColor: 'rgba(20,20,200,0.3)'
  },
  invisible: {
    display: 'none'
  },
  activeDot: {
    backgroundColor: NU_Red
  },
  nonActiveDot: {
    backgroundColor: NU_Grey
  }
});

ProfilePage.propTypes = {
  personData: propTypes.object.isRequired // eslint-disable-line
};

export default connect(
  state => ({
    // firstName: state.userInfo.user.firstName,
  }),
  {
    // updateFirstName,
  }
)(ProfilePage);

