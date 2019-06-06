import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import propTypes from 'prop-types';
import Oops from '../sharedTabComp/Oops';
import CustomMarker from './CustomMarker';
import { FullCard, Spinner, Button } from '../../../common';
import { setCurrentLocation, getActiveNailTechs, getinitialDelta, setMapLoading, setActiveNailTechs } from '../../../store/location/locationServices';
import { colors, latDelta, longDelta, CARD_HEIGHT, CARD_WIDTH, phoneWidth, commonStyles } from '../../../Styles';

// his.state.callsToMap > 3 render oops page TODO

// for line 330!!! took it out so it wont ping my account with fe
// provider={PROVIDER_GOOGLE}

const { NU_Small_Header_Text } = commonStyles;
const { NU_Red, NU_White, NU_Transparent, NU_Background, NU_Card_Border, NU_Text_Desc } = colors; // eslint-disable-line
// const heightMeasurments = (CARD_HEIGHT - (CARD_HEIGHT / 4));
// const widthMeasurments = (phoneWidth - (phoneWidth / 8));
const heightMeasurments = (CARD_HEIGHT - (CARD_HEIGHT / 3));
// const widthMeasurments = (phoneWidth - (phoneWidth / 8)); // **
const widthMeasurments = (phoneWidth - (phoneWidth / 12));

// TODO need to add a button over map to take you to current or zip code saved location
class Maptab extends Component {
  constructor() {
    super();

    this.state = {
      markers: null,
      initialPosition: null,
      callsToMap: 0
    };

    this.onCardClick = this.onCardClick.bind(this);
    this.getLocationInformation = this.getLocationInformation.bind(this);
    this.getMapInfo = this.getMapInfo.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.refetchButton = this.refetchButton.bind(this);
  }

  componentDidMount() {
    console.log('keep in mind this fires when you try to change address');
    this.index = 0;
    this.animation = new Animated.Value(0);
    navigator.geolocation.clearWatch(this.watchID); // eslint-disable-line
    this.getMapInfo(); // might wanna have a check to see if a prop is true since you can enter from home or from change adress, in the case of changing address can enter different function, or just wait til you have that info and then switch pages
  }

  componentWillUnmount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    navigator.geolocation.clearWatch(this.watchID); // eslint-disable-line
    this.regionTimeout = 0;
    this.timer = 0;
    console.log('UNMOUNT');
  }

  async getMapInfo() { // eslint-disable-line
    const { loadingMapData, getActiveNailTechs, getinitialDelta, regionObj, deltas, activeNailTechs } = this.props; // eslint-disable-line
    const { callsToMap } = this.state;
    const isArr = Array.isArray(activeNailTechs);

    if (callsToMap >= 3) return 0;

    if (loadingMapData) {
      await this.setState({ callsToMap: callsToMap + 1 });
      return setTimeout(() => this.getMapInfo(), 750);
    }

    if (!isArr) await getActiveNailTechs();

    if (isArr && !deltas) getinitialDelta();

    // if (isArr && regionObj && deltas) return this.getLocationInformation(); // 🌎🌎🌎 starts map
    if (isArr && regionObj && deltas) {
      console.log('😎😎😎 activeNailTechs', activeNailTechs);
      console.log('😎😎😎 regionObj', regionObj);
      console.log('😎😎😎 deltas', deltas);
      return this.getLocationInformation();
    }

    if (!isArr || !deltas || !regionObj) {
      await this.setState({ callsToMap: callsToMap + 1 });
      return setTimeout(() => this.getMapInfo(), 750);
    }
  }

  // eslint-disable-next-line
  onCardClick (person) {
  // capture info for confirmed visit and details in the redux on they book apt, build big info obj
    console.log('marker', person);
  }

  onMarkerClick() {
    this.setState({
      ...this.state
    });

    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: this.animation
            }
          }
        }
      ],
      { useNativeDriver: true }
    );
  }

  // need to run the same logic a componentwillmount to fetch information
  getLocationInformation() {
    let { getActiveNailTechs, getinitialDelta, setCurrentLocation, regionObj, deltas, activeNailTechs } = this.props;

    const markers = activeNailTechs;
    const init = deltas;

    const dt = new Date();
    const utcDate = dt.toUTCString(); // unique timestamp with date

    // private will pull generic location, otherwise either use built in get location from phone or cached location
    if (regionObj !== 'PRIVATE_LOCATION') { // need to check for private region info not FALSY
      console.log('fired 4 - location isnt private', regionObj, init, markers);

      // const firstMarker = markers[0].coordinate;
      const firstMarker = ((markers[0] || {}).coordinate) || false;

      const initialRegion = {
        latitude: firstMarker.latitude || regionObj.latitude,
        longitude: firstMarker.longitude || regionObj.longitude,
        latitudeDelta: init.latitudeDelta || latDelta,
        longitudeDelta: init.longitudeDelta || longDelta,
        timeStamp: utcDate
      };

      // const initialRegion = {
      //   latitude: regionObj.latitude,
      //   longitude: regionObj.longitude,
      //   latitudeDelta: latDelta,
      //   longitudeDelta: longDelta,
      //   timeStamp: utcDate
      // };

      console.log("&&&&&&&&&&&& initialRegion", initialRegion)
      // console.log("&&&&&&&&&&&& firstMarker", firstMarker)
      console.log("&&&&&&&&&&&& init", init)
      console.log("&&&&&&&&&&&& regionObj", regionObj)
      console.log("&&&&&&&&&&&& latDelta", latDelta)
      console.log("&&&&&&&&&&&& longDelta", longDelta)

      // 🚨🚨🚨🚨 this is STRICTLY to make the home postion the first map focus, to do this properly it needs to be done in redux and not here
      // initialRegion.latitude = 37.773;
      // initialRegion.longitude = -122.396;
      // this is STRICTLY to make the home postion the first map focus, to do this properly it needs to be done in redux and not here

      this.setState({
        initialPosition: initialRegion,
        markers
      });

    } else {
      console.log('fired 3 now with init', regionObj, init, markers);
      navigator.geolocation.clearWatch(this.watchID);

      navigator.geolocation.getCurrentPosition(position => {
        const latitude = parseFloat(position.coords.latitude);
        const longitude = parseFloat(position.coords.longitude);

        const initialRegion = {
          latitude,
          longitude,
          latitudeDelta: init.latitudeDelta || latDelta,
          longitudeDelta: init.longitudeDelta || longDelta,
          timeStamp: utcDate // may want to assiociate timestamp with sessions
        };

        this.setState({
          initialPosition: initialRegion,
          markers
        });

        setCurrentLocation(initialRegion);
      },
      error => console.error(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 40000, maximumAge: 2000 }
      )

      this.watchID = navigator.geolocation.watchPosition(position => {
        const latitude = parseFloat(position.coords.latitude);
        const longitude = parseFloat(position.coords.longitude);

        const lastRegion = {
          latitude,
          longitude,
          latitudeDelta: init.latitudeDelta || latDelta,
          longitudeDelta: init.longitudeDelta || longDelta,
          timeStamp: utcDate
        }

        this.setState({
          initialPosition: lastRegion
        });

      });
    }

    // // We should detect when scrolling has stopped then animate
    // // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      // let index = Math.floor(value / widthMeasurments + 0.3); // animate 30% away from landing on the next item
      let index = Math.floor(value / widthMeasurments + 0.1); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          // changes the region you animate too and keeps your deltas *****
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.initialPosition.latitudeDelta,
              longitudeDelta: this.state.initialPosition.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }

  async refetchButton() {
    const { loadingMapData, getActiveNailTechs, getinitialDelta, regionObj, deltas, activeNailTechs,  } = this.props; // eslint-disable-line
    const { callsToMap } = this.state;
    const isArr = Array.isArray(activeNailTechs);

    if (!Array.isArray(this.props.activeNailTechs)) this.props.setActiveNailTechs('');
    await this.setState({ callsToMap: 0 }); // <=== i dont think t
    return this.getMapInfo();
  }

  render() {
    const { container, scrollView, endPadding, markerWrap, markerSize, card, cardImage, textContent, cardDescription, cardBack, mapCardButton } = styles;
    const { initialPosition, markers, callsToMap } = this.state;

    console.log('🔥🔥🔥🔥');
    console.log('🕔 maptab rerender - render amount direct affected by timer');
    console.log('snapToInterval={widthMeasurments + 6.5} responsible for map snap', widthMeasurments);
    // console.log('NNNNNNNN render', this.state.callsToMap)


    let interpolations;
    if (markers && markers.length) {
      interpolations = markers.map((marker, index) => {
        const inputRange = [
          (index - 1) * widthMeasurments,
          index * widthMeasurments,
          (index + 1) * widthMeasurments
        ];

        const scale = this.animation.interpolate({
          inputRange,
          outputRange: [1, 1.35, 1],
          extrapolate: 'clamp'
        });
        const opacity = this.animation.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: 'clamp'
        });

        const cardBorder = this.animation.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp'
        });
        return { scale, opacity, cardBorder };
      });
    }

    if (callsToMap >= 3) return ( // eslint-disable-line
      <Oops
        compName="Map Page"
        retry={() => this.refetchButton()}
      />
    );

    // eslint-disable-next-line
    if (initialPosition && Array.isArray(markers)) return (
      <View style={container}>

        <MapView

          ref={map => this.map = map} // eslint-disable-line
          initialRegion={initialPosition}
          style={container}
        >

          {markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale
                }
              ]
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity
            };

            return (
              <MapView.Marker
                key={index}
                coordinate={marker.coordinate}
                onPress={() => Actions.ProfilePageMap({ personData: marker })}
              >
                <Animated.View style={[markerWrap, opacityStyle, scaleStyle, markerSize]}>
                  <CustomMarker />
                </Animated.View>
              </MapView.Marker>
            );
          }) }

          {/* below is an optional your location marker */}
          <MapView.Marker
            coordinate={{ latitude: 37.773, longitude: -122.396 }}
            pinColor={NU_White}
          />

        </MapView>

        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator
          snapToInterval={widthMeasurments + 11}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          style={scrollView}
          contentContainerStyle={endPadding}
        >

          {markers.map((marker, index) => {
            // ⭐ fixx --> source={marker.image}
            const opacityStyleBorder = { opacity: interpolations[index].cardBorder };
            return (
              <View key={index}>
              {/* it works, however, it SEEMS TO USE THE BORDER AND SELECTION AS the motion on the swipe instead of the selected card */}
                <Animated.View style={[cardBack, opacityStyleBorder, { display: 'flex' }]} />
                <View style={card}>
                  <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj48iGzNhumqSY2EA3ZQ_Ns5uAvo4vxEapWSBbJ5tmPut-GqPw' }}
                    style={cardImage}
                    resizeMode="cover"
                  />
                  <View style={textContent}>
                    <Text numberOfLines={1} style={NU_Small_Header_Text}>
                      {marker.title}
                    </Text>
                  </View>
                  {/*
                    <Text numberOfLines={1} style={cardDescription}>
                      {marker.description}
                    </Text>
                    <Button
                      buttonText="Try Again"
                      onPress={() =>  { Actions.ProfilePageMap({ personData: marker })}}
                    />
                   */}
                  <TouchableOpacity
                    style={[{ flex: 0.6 }, mapCardButton]}
                    onPress={() => {
                      // Actions.pop();
                      Actions.ProfilePageMap({ personData: marker });
                    }}
                  >
                    <Text style={{ fontWeight: '500' }}>
                      View
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            );
          }) }

        </Animated.ScrollView>

      </View>
    );

    return ( // eslint-disable-line
      <FullCard>
        <Spinner />
      </FullCard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
    width: '100%',
    borderColor: 'black',

    paddingLeft: 15,
    // paddingRight: 20,
    // paddingLeft: 5px,
    backgroundColor: 'blue',
              // snapToInterval={widthMeasurments + 9.274}
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  endPadding: {
    paddingRight: 40
    // paddingRight: phoneWidth - widthMeasurments - ((phoneWidth - widthMeasurments)),
    // paddingRight: phoneWidth - widthMeasurments - ((phoneWidth - widthMeasurments) * 0.6),
    // borderColor: 'black'
  },
  // card: {
  //   padding: 10,
  //   margin: 1.5,
  //   elevation: 3,
  //   backgroundColor: NU_Background,
  //   marginHorizontal: 10,
  //   shadowColor: NU_Card_Border,
  //   shadowRadius: 5,
  //   shadowOpacity: 0.3,
  //   shadowOffset: { x: 2, y: -2 },
  //   height: CARD_HEIGHT,
  //   width: CARD_WIDTH,
  //   overflow: 'hidden',
  //   borderRadius: 3,
  // },
  // cardBack: {
  //   height: CARD_HEIGHT + 5,
  //   width: CARD_WIDTH + 4,
  //   backgroundColor: NU_Red,
  //   borderRadius: 6,
  //   position: 'absolute',
  //   bottom: -1.4,
  //   // left: 0,
  //   right: 8,
  //   // paddingVertical: 10,
  // },
  // cardImage: {
  //   flex: 3,
  //   width: '100%',
  //   height: '100%',
  //   alignSelf: 'center'
  // },

  card: {
    padding: 10,
    // margin: 8,
    marginTop: 12,
    marginRight: 5.1,
    marginBottom: 12,
    marginLeft: 5.1,
    elevation: 3,
    backgroundColor: NU_Background,
    // marginHorizontal: 10,
    shadowColor: NU_Card_Border,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: heightMeasurments,
    width: widthMeasurments,
    // overflow: 'hidden',
    borderRadius: 3,
    // display: 'flex',
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center'
  },
  cardBack: {
    // height: CARD_HEIGHT + 5,
    // width: CARD_WIDTH + 4,
    // backgroundColor: NU_Red,
    // borderRadius: 6,
    // position: 'absolute',
    // bottom: -1.4,
    // // left: 0,
    // right: 8,
    // paddingVertical: 10,
  },
  cardImage: {
    // flex: 3,
    // width: '100%',
    // height: '100%',
    // alignSelf: 'center'
  },

  textContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardDescription: {
    fontSize: 12,
    color: NU_Text_Desc
  },
  markerSize: {
    width: 100,
    height: 40
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapCardButton: {
    backgroundColor: NU_Red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
});

Maptab.propTypes = {
  setCurrentLocation: propTypes.func.isRequired,
  getActiveNailTechs: propTypes.func.isRequired,
  getinitialDelta: propTypes.func.isRequired,
  loadingMapData: propTypes.bool.isRequired,
  /* eslint-disable */
  regionObj: propTypes.object,
  deltas: propTypes.object,
  activeNailTechs: propTypes.array
  /* eslint-enable */
};

Maptab.defaultProps = {
  regionObj: null,
  deltas: null,
  activeNailTechs: null
};

export default connect(
  state => {
    // console.log('state', state)
    return {
      regionObj: state.location.locationServices.regionObj,
      activeNailTechs: state.location.locationServices.activeNailTechs,
      deltas: state.location.locationServices.deltas,
      favorites: state.userInfo.user.favorites, // be sure to change this where ever the markers are in the code so that it listens for the prop that gets the map info to renender when waiting
      loadingMapData: state.location.locationServices.loadingMapData
    };
  },
  {
    setActiveNailTechs,
    setCurrentLocation,
    getActiveNailTechs,
    getinitialDelta,
    setMapLoading
  }
)(Maptab);

// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Animated,
//   Image,
//   TouchableOpacity
// } from 'react-native';
// import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import propTypes from 'prop-types';
// import Oops from '../sharedTabComp/Oops';
// import CustomMarker from './CustomMarker';
// import { FullCard, Spinner, Button } from '../../../common';
// import { setCurrentLocation, getActiveNailTechs, getinitialDelta, setMapLoading, setActiveNailTechs } from '../../../store/location/locationServices';
// import { colors, latDelta, longDelta, CARD_HEIGHT, CARD_WIDTH, phoneWidth, commonStyles } from '../../../Styles';

// // his.state.callsToMap > 3 render oops page TODO

// // for line 330!!! took it out so it wont ping my account with fe
// // provider={PROVIDER_GOOGLE}

// const { NU_Small_Header_Text } = commonStyles;
// const { NU_Red, NU_White, NU_Transparent, NU_Background, NU_Card_Border, NU_Text_Desc } = colors; // eslint-disable-line

// // TODO need to add a button over map to take you to current or zip code saved location
// class Maptab extends Component {
//   constructor() {
//     super();

//     this.state = {
//       markers: null,
//       initialPosition: null,
//       callsToMap: 0
//     };

//     this.onCardClick = this.onCardClick.bind(this);
//     this.getLocationInformation = this.getLocationInformation.bind(this);
//     this.getMapInfo = this.getMapInfo.bind(this);
//     this.onMarkerClick = this.onMarkerClick.bind(this);
//     this.refetchButton = this.refetchButton.bind(this);
//   }

//   componentDidMount() {
//     console.log('keep in mind this fires when you try to change address');
//     this.index = 0;
//     this.animation = new Animated.Value(0);
//     navigator.geolocation.clearWatch(this.watchID); // eslint-disable-line
//     this.getMapInfo(); // might wanna have a check to see if a prop is true since you can enter from home or from change adress, in the case of changing address can enter different function, or just wait til you have that info and then switch pages
//   }

//   componentWillUnmount() {
//     this.index = 0;
//     this.animation = new Animated.Value(0);
//     navigator.geolocation.clearWatch(this.watchID); // eslint-disable-line
//     this.regionTimeout = 0;
//     this.timer = 0;
//     console.log('UNMOUNT');
//   }

//   async getMapInfo() { // eslint-disable-line
//     const { loadingMapData, getActiveNailTechs, getinitialDelta, regionObj, deltas, activeNailTechs } = this.props; // eslint-disable-line
//     const { callsToMap } = this.state;
//     const isArr = Array.isArray(activeNailTechs);

//     if (callsToMap >= 3) return 0;

//     if (loadingMapData) {
//       await this.setState({ callsToMap: callsToMap + 1 });
//       return setTimeout(() => this.getMapInfo(), 750);
//     }

//     if (!isArr) await getActiveNailTechs();

//     if (isArr && !deltas) getinitialDelta();

//     // if (isArr && regionObj && deltas) return this.getLocationInformation(); // 🌎🌎🌎 starts map
//     if (isArr && regionObj && deltas) {
//       console.log('😎😎😎 activeNailTechs', activeNailTechs);
//       console.log('😎😎😎 regionObj', regionObj);
//       console.log('😎😎😎 deltas', deltas);
//       return this.getLocationInformation();
//     }

//     if (!isArr || !deltas || !regionObj) {
//       await this.setState({ callsToMap: callsToMap + 1 });
//       return setTimeout(() => this.getMapInfo(), 750);
//     }
//   }

//   // eslint-disable-next-line
//   onCardClick (person) {
//   // capture info for confirmed visit and details in the redux on they book apt, build big info obj
//     console.log('marker', person);
//   }

//   onMarkerClick() {
//     this.setState({
//       ...this.state
//     });

//     Animated.event(
//       [
//         {
//           nativeEvent: {
//             contentOffset: {
//               x: this.animation
//             }
//           }
//         }
//       ],
//       { useNativeDriver: true }
//     );
//   }

//   // need to run the same logic a componentwillmount to fetch information
//   getLocationInformation() {
//     let { getActiveNailTechs, getinitialDelta, setCurrentLocation, regionObj, deltas, activeNailTechs } = this.props;

//     const markers = activeNailTechs;
//     const init = deltas;

//     const dt = new Date();
//     const utcDate = dt.toUTCString(); // unique timestamp with date

//     // private will pull generic location, otherwise either use built in get location from phone or cached location
//     if (regionObj !== 'PRIVATE_LOCATION') { // need to check for private region info not FALSY
//       console.log('fired 4 - location isnt private', regionObj, init, markers);

//       // const firstMarker = markers[0].coordinate;
//       const firstMarker = ((markers[0] || {}).coordinate) || false;

//       const initialRegion = {
//         latitude: firstMarker.latitude || regionObj.latitude,
//         longitude: firstMarker.longitude || regionObj.longitude,
//         latitudeDelta: init.latitudeDelta || latDelta,
//         longitudeDelta: init.longitudeDelta || longDelta,
//         timeStamp: utcDate
//       };

//       // const initialRegion = {
//       //   latitude: regionObj.latitude,
//       //   longitude: regionObj.longitude,
//       //   latitudeDelta: latDelta,
//       //   longitudeDelta: longDelta,
//       //   timeStamp: utcDate
//       // };

//       console.log("&&&&&&&&&&&& initialRegion", initialRegion)
//       // console.log("&&&&&&&&&&&& firstMarker", firstMarker)
//       console.log("&&&&&&&&&&&& init", init)
//       console.log("&&&&&&&&&&&& regionObj", regionObj)
//       console.log("&&&&&&&&&&&& latDelta", latDelta)
//       console.log("&&&&&&&&&&&& longDelta", longDelta)

//       // 🚨🚨🚨🚨 this is STRICTLY to make the home postion the first map focus, to do this properly it needs to be done in redux and not here
//       // initialRegion.latitude = 37.773;
//       // initialRegion.longitude = -122.396;
//       // this is STRICTLY to make the home postion the first map focus, to do this properly it needs to be done in redux and not here

//       this.setState({
//         initialPosition: initialRegion,
//         markers
//       });

//     } else {
//       console.log('fired 3 now with init', regionObj, init, markers);
//       navigator.geolocation.clearWatch(this.watchID);

//       navigator.geolocation.getCurrentPosition(position => {
//         const latitude = parseFloat(position.coords.latitude);
//         const longitude = parseFloat(position.coords.longitude);

//         const initialRegion = {
//           latitude,
//           longitude,
//           latitudeDelta: init.latitudeDelta || latDelta,
//           longitudeDelta: init.longitudeDelta || longDelta,
//           timeStamp: utcDate // may want to assiociate timestamp with sessions
//         };

//         this.setState({
//           initialPosition: initialRegion,
//           markers
//         });

//         setCurrentLocation(initialRegion);
//       },
//       error => console.error(JSON.stringify(error)),
//       { enableHighAccuracy: true, timeout: 40000, maximumAge: 2000 }
//       )

//       this.watchID = navigator.geolocation.watchPosition(position => {
//         const latitude = parseFloat(position.coords.latitude);
//         const longitude = parseFloat(position.coords.longitude);

//         const lastRegion = {
//           latitude,
//           longitude,
//           latitudeDelta: init.latitudeDelta || latDelta,
//           longitudeDelta: init.longitudeDelta || longDelta,
//           timeStamp: utcDate
//         }

//         this.setState({
//           initialPosition: lastRegion
//         });

//       });
//     }

//     // // We should detect when scrolling has stopped then animate
//     // // We should just debounce the event listener here
//     this.animation.addListener(({ value }) => {
//       let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
//       if (index >= this.state.markers.length) {
//         index = this.state.markers.length - 1;
//       }
//       if (index <= 0) {
//         index = 0;
//       }

//       this.regionTimeout = setTimeout(() => {
//         if (this.index !== index) {
//           this.index = index;
//           const { coordinate } = this.state.markers[index];
//           // changes the region you animate too and keeps your deltas *****
//           this.map.animateToRegion(
//             {
//               ...coordinate,
//               latitudeDelta: this.state.initialPosition.latitudeDelta,
//               longitudeDelta: this.state.initialPosition.longitudeDelta
//             },
//             350
//           );
//         }
//       }, 10);
//     });
//   }

//   async refetchButton() {
//     const { loadingMapData, getActiveNailTechs, getinitialDelta, regionObj, deltas, activeNailTechs,  } = this.props; // eslint-disable-line
//     const { callsToMap } = this.state;
//     const isArr = Array.isArray(activeNailTechs);

//     if (!Array.isArray(this.props.activeNailTechs)) this.props.setActiveNailTechs('');
//     await this.setState({ callsToMap: 0 }); // <=== i dont think t
//     return this.getMapInfo();
//   }

//   render() {
//     const { container, scrollView, endPadding, markerWrap, markerSize, card, cardImage, textContent, cardDescription, cardBack, mapCardButton } = styles;
//     const { initialPosition, markers, callsToMap } = this.state;
//     console.log('🔥🔥🔥🔥');
//     console.log('🕔 maptab rerender - render amount direct affected by timer');
//     // console.log('NNNNNNNN render', this.state.callsToMap)


//     let interpolations;
//     if (markers && markers.length) {
//       interpolations = markers.map((marker, index) => {
//         const inputRange = [
//           (index - 1) * CARD_WIDTH,
//           index * CARD_WIDTH,
//           (index + 1) * CARD_WIDTH
//         ];

//         const scale = this.animation.interpolate({
//           inputRange,
//           outputRange: [1, 1.35, 1],
//           extrapolate: 'clamp'
//         });
//         const opacity = this.animation.interpolate({
//           inputRange,
//           outputRange: [0.35, 1, 0.35],
//           extrapolate: 'clamp'
//         });

//         const cardBorder = this.animation.interpolate({
//           inputRange,
//           outputRange: [0, 1, 0],
//           extrapolate: 'clamp'
//         });
//         return { scale, opacity, cardBorder };
//       });
//     }

//     if (callsToMap >= 3) return ( // eslint-disable-line
//       <Oops
//         compName="Map Page"
//         retry={() => this.refetchButton()}
//       />
//     );

//     // eslint-disable-next-line
//     if (initialPosition && Array.isArray(markers)) return (
//       <View style={container}>

//         <MapView

//           ref={map => this.map = map} // eslint-disable-line
//           initialRegion={initialPosition}
//           style={container}
//         >

//           {markers.map((marker, index) => {
//             const scaleStyle = {
//               transform: [
//                 {
//                   scale: interpolations[index].scale
//                 }
//               ]
//             };
//             const opacityStyle = {
//               opacity: interpolations[index].opacity
//             };

//             return (
//               <MapView.Marker
//                 key={index}
//                 coordinate={marker.coordinate}
//                 onPress={() => Actions.ProfilePageMap({ personData: marker })}
//               >
//                 <Animated.View style={[markerWrap, opacityStyle, scaleStyle, markerSize]}>
//                   <CustomMarker />
//                 </Animated.View>
//               </MapView.Marker>
//             );
//           }) }

//           {/* below is an optional your location marker */}
//           <MapView.Marker
//             coordinate={{ latitude: 37.773, longitude: -122.396 }}
//             pinColor={NU_White}
//           />

//         </MapView>

//         <Animated.ScrollView
//           horizontal
//           scrollEventThrottle={1}
//           showsHorizontalScrollIndicator
//           snapToInterval={CARD_WIDTH}
//           onScroll={Animated.event(
//             [
//               {
//                 nativeEvent: {
//                   contentOffset: {
//                     x: this.animation
//                   }
//                 }
//               }
//             ],
//             { useNativeDriver: true }
//           )}
//           style={scrollView}
//           contentContainerStyle={endPadding}
//         >

//           {markers.map((marker, index) => {
//             // ⭐ fixx --> source={marker.image}
//             const opacityStyleBorder = { opacity: interpolations[index].cardBorder };
//             return (
//               <View key={index}>
//               {/* it works, however, it SEEMS TO USE THE BORDER AND SELECTION AS the motion on the swipe instead of the selected card */}
//                 <Animated.View style={[cardBack, opacityStyleBorder, { display: 'flex' }]} />
//                 <View style={card}>
//                   <Image
//                     source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj48iGzNhumqSY2EA3ZQ_Ns5uAvo4vxEapWSBbJ5tmPut-GqPw' }}
//                     style={cardImage}
//                     resizeMode="cover"
//                   />
//                   <View style={textContent}>
//                     <Text numberOfLines={1} style={NU_Small_Header_Text}>
//                       {marker.title}
//                     </Text>
//                   </View>
//                   {/*
//                     <Text numberOfLines={1} style={cardDescription}>
//                       {marker.description}
//                     </Text>
//                     <Button
//                       buttonText="Try Again"
//                       onPress={() =>  { Actions.ProfilePageMap({ personData: marker })}}
//                     />
//                    */}
//                   <TouchableOpacity
//                     style={[{ flex: 0.6 }, mapCardButton]}
//                     onPress={() => {
//                       // Actions.pop();
//                       Actions.ProfilePageMap({ personData: marker });
//                     }}
//                   >
//                     <Text style={{ fontWeight: '500' }}>
//                       View
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//             );
//           }) }

//         </Animated.ScrollView>

//       </View>
//     );

//     return ( // eslint-disable-line
//       <FullCard>
//         <Spinner />
//       </FullCard>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   scrollView: {
//     position: 'absolute',
//     bottom: 30,
//     left: 0,
//     right: 0,
//     paddingVertical: 10,
//     width: '100%',
//     borderColor: 'black'


//     ,backgroundColor: 'pink',
//   },
//   endPadding: {
//     paddingRight: phoneWidth - CARD_WIDTH - ((phoneWidth - CARD_WIDTH) * 0.6),
//     borderColor: 'black'
//   },
//   card: {
//     padding: 10,
//     margin: 1.5,
//     elevation: 3,
//     backgroundColor: NU_Background,
//     marginHorizontal: 10,
//     shadowColor: NU_Card_Border,
//     shadowRadius: 5,
//     shadowOpacity: 0.3,
//     shadowOffset: { x: 2, y: -2 },
//     height: CARD_HEIGHT,
//     width: CARD_WIDTH,
//     overflow: 'hidden',
//     borderRadius: 3,
//   },
//   cardBack: {
//     height: CARD_HEIGHT + 5,
//     width: CARD_WIDTH + 4,
//     backgroundColor: NU_Red,
//     borderRadius: 6,
//     position: 'absolute',
//     bottom: -1.4,
//     // left: 0,
//     right: 8,
//     // paddingVertical: 10,
//   },
//   cardImage: {
//     flex: 3,
//     width: '100%',
//     height: '100%',
//     alignSelf: 'center'
//   },
//   textContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   cardDescription: {
//     fontSize: 12,
//     color: NU_Text_Desc
//   },
//   markerSize: {
//     width: 100,
//     height: 40
//   },
//   markerWrap: {
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   mapCardButton: {
//     backgroundColor: NU_Red,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5
//   }
// });

// Maptab.propTypes = {
//   setCurrentLocation: propTypes.func.isRequired,
//   getActiveNailTechs: propTypes.func.isRequired,
//   getinitialDelta: propTypes.func.isRequired,
//   loadingMapData: propTypes.bool.isRequired,
//   /* eslint-disable */
//   regionObj: propTypes.object,
//   deltas: propTypes.object,
//   activeNailTechs: propTypes.array
//   /* eslint-enable */
// };

// Maptab.defaultProps = {
//   regionObj: null,
//   deltas: null,
//   activeNailTechs: null
// };

// export default connect(
//   state => {
//     // console.log('state', state)
//     return {
//       regionObj: state.location.locationServices.regionObj,
//       activeNailTechs: state.location.locationServices.activeNailTechs,
//       deltas: state.location.locationServices.deltas,
//       favorites: state.userInfo.user.favorites, // be sure to change this where ever the markers are in the code so that it listens for the prop that gets the map info to renender when waiting
//       loadingMapData: state.location.locationServices.loadingMapData
//     };
//   },
//   {
//     setActiveNailTechs,
//     setCurrentLocation,
//     getActiveNailTechs,
//     getinitialDelta,
//     setMapLoading
//   }
// )(Maptab);


// works dolo - meaning if the api isnt called on load this will do the job
// async getMapInfo() { // eslint-disable-line
//   const { loadingMapData, setMapLoading, getActiveNailTechs, getinitialDelta, setCurrentLocation, regionObj, deltas, activeNailTechs } = this.props;
//   const { callsToMap } = this.state;

//   if (callsToMap >= 3) return 0;

//   if (loadingMapData) {
//     await this.setState({ callsToMap: callsToMap + 1 });
//     return setTimeout(() => this.getMapInfo(), 750);
//   }

//   if (!loadingMapData && activeNailTechs === 'empty') {
//     setMapLoading(true);
//     await getActiveNailTechs()
//       .then(() => (Array.isArray(activeNailTechs)) && getinitialDelta());
//   }

//   const isArr = Array.isArray(activeNailTechs);

//   // normal case when load is initated from app start also if you come here from another page or you have a home location
//   if (!loadingMapData && isArr && !deltas) getinitialDelta();

//   // 🛑 activates map
//   if (isArr && regionObj && deltas) return this.getLocationInformation();

//   if ((activeNailTechs === 'empty' || !isArr || !deltas || !regionObj) && !loadingMapData) {
//     await this.setState({ callsToMap: callsToMap + 1 });
//     return this.getMapInfo();
//   }

//   return 0;
// }


// export default connect(
//   state => ({
//     regionObj: state.location.locationServices.regionObj,
//     activeNailTechs: state.location.locationServices.activeNailTechs,
//     deltas: state.location.locationServices.deltas
//     // favorites: state.userInfo.user.favorites // be sure to change this where ever the markers are in the code so that it listens for the prop that gets the map info to renender when waiting
//   }),
//   {
//     setCurrentLocation,
//     getActiveNailTechs,
//     getinitialDelta
//   }
// )(Maptab);



// <View  style={card} key={index}>
//               <Animated.View style={[cardBack, opacityStyleBorder ]} />
//                 <View>
//                   <Image
//                     source={marker.image}
//                     style={cardImage}
//                     resizeMode="cover"
//                   />
//                   <View style={textContent}>
//                     <Text numberOfLines={1} style={cardtitle}>
//                       {marker.title}
//                     </Text>
//                     <Text numberOfLines={1} style={cardDescription}>
//                       {marker.description}
//                     </Text>
//                   </View>
//                   <TouchableOpacity onPress={() => this.onCardClick(marker)}>
//                     <Text>
//                       button
//                     </Text>
//                   </TouchableOpacity>
//                   </View>
//                   </View>

//                   container: {
//                     flex: 1
//                   },
//                   scrollView: {
//                     position: 'absolute',
//                     bottom: 30,
//                     left: 0,
//                     right: 0,
//                     paddingVertical: 10,
//                   },
//                   endPadding: {
//                     paddingRight: phoneWidth - CARD_WIDTH,
//                   },
//                   card: {
//                     padding: 10,
//                     elevation: 2,
//                     backgroundColor: NU_Background,
//                     marginHorizontal: 10,
//                     shadowColor: NU_Card_Border,
//                     shadowRadius: 5,
//                     shadowOpacity: 0.3,
//                     shadowOffset: { x: 2, y: -2 },
//                     height: CARD_HEIGHT,
//                     width: CARD_WIDTH,
//                     overflow: 'hidden',
//                     borderRadius: 5,
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                   },
//                   cardBack: {
//                     display: 'flex',
//                     padding: 10,
//                     elevation: 2,
//                     backgroundColor: NU_Red,
//                     marginHorizontal: 10,
//                     shadowColor: NU_Card_Border,
//                     shadowRadius: 5,
//                     shadowOpacity: 0.3,
//                     // shadowOffset: { x: 2, y: -2 },
//                     height: CARD_HEIGHT + 2,
//                     width: CARD_WIDTH + 2,
//                     // overflow: 'hidden',
//                     borderRadius: 5
//                   },
//                   cardImage: {
//                     flex: 3,
//                     width: '100%',
//                     height: '100%',
//                     alignSelf: 'center'
//                   },
//                   textContent: {
//                     flex: 1
//                   },
//                   cardtitle: {
//                     fontSize: 12,
//                     marginTop: 5,
//                     fontWeight: 'bold'
//                   },
//                   cardDescription: {
//                     fontSize: 12,
//                     color: NU_Text_Desc
//                   },
//                   markerSize: {
//                     width: 100,
//                     height: 40
//                   },
//                   markerWrap: {
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                   }

































/// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Animated,
//   Image,
//   Dimensions,
//   TouchableOpacity
// } from 'react-native';
// import { connect } from 'react-redux';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import CustomMarker from './CustomMarker';
// import { FullCard, Spinner } from '../../../common';
// import { setCurrentLocation, getActiveNailTechs, getinitialDelta } from '../../../store/location/locationServices';
// import { colors, latDelta, longDelta, CARD_HEIGHT, CARD_WIDTH, phoneWidth } from '../../../Styles';

// // TODO need to add a button over map to take you to current or zip code saved location
// class Maptab extends Component {
//   constructor() {
//     super();

//     this.state = {
//       markers: null,
//       initialPosition: null
//     };

//     // this.renderMarkers = this.renderMarkers.bind(this);
//     // this.renderCards = this.renderCards.bind(this);
//     this.onCardClick = this.onCardClick.bind(this);
//     this.getLocationInformation = this.getLocationInformation.bind(this);
//     this.timer = this.timer.bind(this);
//   }

//   componentWillMount() {
//     this.index = 0;
//     this.animation = new Animated.Value(0);
//     navigator.geolocation.clearWatch(this.watchID); // eslint-disable-line
//     this.timer();
//   }

//   // maybe get it down to this .. will have to check and render info if it is available
//   componentDidMount() {
//     console.log('component will mount in maptab run')
//     const { getActiveNailTechs, getinitialDelta, setCurrentLocation, regionObj } = this.props; // eslint-disable-line

//     // currently get active nailtechs run depends on a successful call to getuserinfo in router, so on final timer reset may need to call
//     // HUGE** get active nail techs is its OWN THING bc in the future itll have its own call to google to get active people,
//     // this for now will have to be recalled to be updated until we can run a watch on it
//     if (!Array.isArray(this.props.activeNailTechs)) this.props.getActiveNailTechs();

//     // ****** if you have required info cancel timer and call function that renders map
//     return;
//   }

//   componentWillUnmount() {
//     this.index = 0;
//     this.animation = new Animated.Value(0);
//     navigator.geolocation.clearWatch(this.watchID); // eslint-disable-line
//     this.regionTimeout = 0;
//     this.timer = 0;
//     console.log('UNMOUNT');
//   }

//   // eslint-disable-next-line
//   onCardClick (person) {
//   // capture info for confirmed visit and details in the redux on they book apt, build big info obj
//     console.log('marker', person);
//   }

//   // need to run the same logic a componentwillmount to fetch information
//   getLocationInformation() {
//     let { getActiveNailTechs, getinitialDelta, setCurrentLocation, regionObj, deltas, activeNailTechs } = this.props;

//     const markers = activeNailTechs;
//     const init = deltas;

//     // *** above should be called before this component loads

//     const dt = new Date();
//     const utcDate = dt.toUTCString(); // unique timestamp with date

//     if (regionObj !== 'PRIVATE_LOCATION') { // need to check for private region info not FALSY
//       console.log('fired 4 - location isnt private', regionObj, init, markers);

//       const initialRegion = {
//         latitude: regionObj.latitude,
//         longitude: regionObj.longitude,
//         latitudeDelta: init.latitudeDelta || latDelta,
//         longitudeDelta: init.longitudeDelta || longDelta
//       };

//       console.log('🌎initialRegion1', initialRegion);

//       this.setState({
//         initialPosition: initialRegion,
//         markers
//       });

//     } else {
//       console.log('fired 3 now with init', regionObj, init, markers);
//       navigator.geolocation.clearWatch(this.watchID);

//       navigator.geolocation.getCurrentPosition(position => {
//         const latitude = parseFloat(position.coords.latitude);
//         const longitude = parseFloat(position.coords.longitude);

//         const initialRegion = {
//           latitude,
//           longitude,
//           latitudeDelta: init.latitudeDelta || latDelta,
//           longitudeDelta: init.longitudeDelta || longDelta,
//           timeStamp: utcDate // may want to assiociate timestamp with sessions
//         };

//         console.log('🌎initialRegion2', initialRegion);

//         this.setState({
//           initialPosition: initialRegion, // if you want ur stRTING POINT TO BE A central location beteen markers and not yourself
//           markers
//         });

//         setCurrentLocation(initialRegion);
//       },
//       error => console.error(JSON.stringify(error)),
//       { enableHighAccuracy: true, timeout: 40000, maximumAge: 2000 }
//       )

//       this.watchID = navigator.geolocation.watchPosition(position => {
//         const latitude = parseFloat(position.coords.latitude);
//         const longitude = parseFloat(position.coords.longitude);

//         const lastRegion = {
//           latitude,
//           longitude,
//           latitudeDelta: init.latitudeDelta || latDelta,
//           longitudeDelta: init.longitudeDelta || longDelta,
//           timeStamp: utcDate
//         }

//         this.setState({
//           initialPosition: lastRegion
//         });

//       });
//     }

//     // // We should detect when scrolling has stopped then animate
//     // // We should just debounce the event listener here
//     this.animation.addListener(({ value }) => {
//       let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
//       if (index >= this.state.markers.length) {
//         index = this.state.markers.length - 1;
//       }
//       if (index <= 0) {
//         index = 0;
//       }

//       this.regionTimeout = setTimeout(() => {
//         if (this.index !== index) {
//           this.index = index;
//           const { coordinate } = this.state.markers[index];
//           // changes the region you animate too and keeps your deltas *****
//           this.map.animateToRegion(
//             {
//               ...coordinate,
//               latitudeDelta: this.state.initialPosition.latitudeDelta,
//               longitudeDelta: this.state.initialPosition.longitudeDelta
//             },
//             350
//           );
//         }
//       }, 10);
//     });
//   }


//   // renderMarkers(marker, index) {
//     // const { markerWrap, markerSize } = styles;
//     // this is the snippet of code that is reponsible for what paticlular marker is zoomed in on
//     // const interpolations = this.state.markers.map((marker, index) => {
//     //   const inputRange = [
//     //     (index - 1) * CARD_WIDTH,
//     //     index * CARD_WIDTH,
//     //     ((index + 1) * CARD_WIDTH)
//     //   ];
//     //   const scale = this.animation.interpolate({
//     //     inputRange,
//     //     outputRange: [1, 1.35, 1],
//     //     extrapolate: 'clamp'
//     //   });
//     //   const opacity = this.animation.interpolate({
//     //     inputRange,
//     //     outputRange: [0.35, 1, 0.35],
//     //     extrapolate: 'clamp'
//     //   });

//     //   const cardBorder = this.animation.interpolate({
//     //       inputRange,
//     //       outputRange: [0, 1, 0],
//     //       extrapolate: 'clamp'
//     //   });
//     //   return { scale, opacity, cardBorder };
//     //   // return { scale, opacity };
//     // });

//     // const scaleStyle = {
//     //   transform: [
//     //     {
//     //       scale: interpolations[index].scale
//     //     },
//     //   ],
//     // };
//     // const opacityStyle = {
//     //   opacity: interpolations[index].opacity
//     // };

//     // return (
//       // <MapView.Marker key={index} coordinate={marker.coordinate}>
//       //   <Animated.View style={[markerWrap, opacityStyle, scaleStyle, markerSize]}>
//       //     <CustomMarker />
//       //   </Animated.View>
//       // </MapView.Marker>
//     // );
//   // }


//   renderCards(marker, index) {
//     // tried to make seperate component out of this, will not work please leave alone
//     const {
//       // card,
//       // cardImage,
//       // textContent,
//       // cardtitle,
//       // cardDescription
//     } = styles;

//     // return (
//     //   <View style={card} key={index}>
//     //     <Image
//     //       source={marker.image}
//     //       style={cardImage}
//     //       resizeMode="cover"
//     //     />
//     //     <View style={textContent}>
//     //       <Text numberOfLines={1} style={cardtitle}>
//     //         {marker.title}
//     //       </Text>
//     //       <Text numberOfLines={1} style={cardDescription}>
//     //         {marker.description}
//     //       </Text>
//     //     </View>
//     //     <TouchableOpacity onPress={() => this.onCardClick(marker)}>
//     //       <Text>
//     //         button
//     //       </Text>
//     //     </TouchableOpacity>
//     //   </View>
//     // );
//   }

//   timer() {
// // ******************************************************* if you turn on userFetch ioff in router then infinite loop - FIXXXXXXXXXXXXXXXXXX
//     const myInterval = setInterval(() => {
//       console.log('started')
//       if (this.props.activeNailTechs && this.props.regionObj && this.props.deltas) {
//         console.log('timer stopped 🛑');
//         clearInterval(myInterval);
//         return this.getLocationInformation();
//       }
//       console.log('rerunning timer function ⛳');
//       if (!Array.isArray(this.props.activeNailTechs)) this.props.getActiveNailTechs();
//       this.props.getinitialDelta();
//     // }, 1500);
//     }, 500);
//   }

//   render() {
//     const { container, scrollView, endPadding, markerWrap, markerSize, card, cardImage, textContent, cardtitle, cardDescription, cardBack } = styles;
//     const { initialPosition, markers } = this.state;
//     const { NU_White } = colors;

//     console.log('maptab rerender - render amount direct affected by timer');

//     let interpolations;
//     if ( this.state.markers && this.state.markers.length ) {
//       interpolations = this.state.markers.map((marker, index) => {
//         const inputRange = [
//           (index - 1) * CARD_WIDTH,
//           index * CARD_WIDTH,
//           ((index + 1) * CARD_WIDTH)
//         ];
//         const scale = this.animation.interpolate({
//           inputRange,
//           outputRange: [1, 1.35, 1],
//           extrapolate: 'clamp'
//         });
//         const opacity = this.animation.interpolate({
//           inputRange,
//           outputRange: [0.35, 1, 0.35],
//           extrapolate: 'clamp'
//         });

//         const cardBorder = this.animation.interpolate({
//             inputRange,
//             outputRange: [0, 1, 0],
//             extrapolate: 'clamp'
//         });
//         console.log('scale, opacity, cardBorder, marker, index', scale, opacity, cardBorder, marker, index);
//         return { scale, opacity, cardBorder };
//       });
//     }

//     if (!initialPosition || !markers) return (
//       <FullCard>
//         <Spinner />
//       </FullCard>
//     );

//     return (
//       <View style={container}>

//         <MapView
//           provider={PROVIDER_GOOGLE}
//           ref={map => this.map = map} // eslint-disable-line
//           initialRegion={initialPosition}
//           style={container}
//         >

//           { markers.map((marker, index) => {
//               const scaleStyle = {
//                 transform: [
//                   {
//                     scale: interpolations[index].scale
//                   },
//                 ],
//               };
//               const opacityStyle = {
//                 opacity: interpolations[index].opacity
//               }
//               console.log('opacityStyle', opacityStyle)
//               return(
//                 <MapView.Marker key={index} coordinate={marker.coordinate}>
//                   <Animated.View style={[markerWrap, opacityStyle, scaleStyle, markerSize]}>
//                     <CustomMarker />
//                   </Animated.View>
//                 </MapView.Marker>
//               )
//           }) }

//           {/* below is an optional your location marker */}

//           <MapView.Marker coordinate={initialPosition} pinColor={NU_White} />

//         </MapView>

//         <Animated.ScrollView
//           horizontal
//           scrollEventThrottle={1}
//           showsHorizontalScrollIndicator
//           snapToInterval={CARD_WIDTH}
//           onScroll={Animated.event(
//             [
//               {
//                 nativeEvent: {
//                   contentOffset: {
//                     x: this.animation
//                   }
//                 }
//               }
//             ],
//             { useNativeDriver: true }
//           )}
//           style={scrollView}
//           contentContainerStyle={endPadding}
//         >

//           { markers.map((marker, index) => {
//             // const scaleStyle = {
//             //   transform: [
//             //     {
//             //       scale: interpolations[index].scale
//             //     },
//             //   ],
//             // };
//             const opacityStyleBorder = {
//               opacity: interpolations[index].cardBorder
//             }
//             // { backgroundColor: 'blue'}
//             return (
//               <View key={index}>
//               {/* it works, however, it SEEMS TO USE THE BORDER AND SELECTION AS the motion on the swipe instead of the selected card */}
//                <Animated.View style={[cardBack, opacityStyleBorder, {display: 'flex'} ]} />
//                 <View style={card}>
//                   <Image
//                     source={marker.image}
//                     style={cardImage}
//                     resizeMode="cover"
//                   />
//                   <View style={textContent}>
//                     <Text numberOfLines={1} style={cardtitle}>
//                       {marker.title}
//                     </Text>
//                     <Text numberOfLines={1} style={cardDescription}>
//                       {marker.description}
//                     </Text>
//                   </View>
//                   <TouchableOpacity onPress={() => this.onCardClick(marker)}>
//                     <Text>
//                       button
//                     </Text>
//                   </TouchableOpacity>
//                   </View>
//                   </View>

//             );
//           }) }

//         </Animated.ScrollView>

//       </View>
//     );
//   }
// }

// // export default connect(
// //   state => ({
// //     regionObj: state.location.locationServices.regionObj,
// //     activeNailTechs: state.location.locationServices.activeNailTechs,
// //     deltas: state.location.locationServices.deltas
// //     // favorites: state.userInfo.user.favorites // be sure to change this where ever the markers are in the code so that it listens for the prop that gets the map info to renender when waiting
// //   }),
// //   {
// //     setCurrentLocation,
// //     getActiveNailTechs,
// //     getinitialDelta
// //   }
// // )(Maptab);

// export default connect(
//   state => {
//     console.log('state', state)
//     return {
//     regionObj: state.location.locationServices.regionObj,
//     activeNailTechs: state.location.locationServices.activeNailTechs,
//     deltas: state.location.locationServices.deltas,
//     favorites: state.userInfo.user.favorites // be sure to change this where ever the markers are in the code so that it listens for the prop that gets the map info to renender when waiting
//   }},
//   {
//     setCurrentLocation,
//     getActiveNailTechs,
//     getinitialDelta
//   }
// )(Maptab);

// const { NU_Red, NU_White, NU_Transparent, NU_Background, NU_Card_Border, NU_Text_Desc } = colors; // eslint-disable-line

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   scrollView: {
//     position: 'absolute',
//     bottom: 30,
//     left: 0,
//     right: 0,
//     paddingVertical: 10,
//   },
//   endPadding: {
//     paddingRight: phoneWidth - CARD_WIDTH,
//   },
//   card: {
//     padding: 10,
//     elevation: 2,
//     backgroundColor: NU_Background,
//     marginHorizontal: 10,
//     shadowColor: NU_Card_Border,
//     shadowRadius: 5,
//     shadowOpacity: 0.3,
//     shadowOffset: { x: 2, y: -2 },
//     height: CARD_HEIGHT,
//     width: CARD_WIDTH,
//     overflow: 'hidden',
//     borderRadius: 5,
//   },
//   cardBack: {
//     // padding: 10,
//     // elevation: 2,
//     // marginHorizontal: 0,
//     // shadowColor: NU_Card_Border,
//     // shadowRadius: 5,
//     // shadowOpacity: 0.3,
//     // shadowOffset: { x: 2, y: -2 },

//     height: CARD_HEIGHT + 4,
//     width: CARD_WIDTH + 4,
//     backgroundColor: NU_Red,
//     borderRadius: 6,
//     position: 'absolute',
//     bottom: -1.5,
//     // left: 0,
//     right: 8,
//     // paddingVertical: 10,
//   },
//   cardImage: {
//     flex: 3,
//     width: '100%',
//     height: '100%',
//     alignSelf: 'center'
//   },
//   textContent: {
//     flex: 1
//   },
//   cardtitle: {
//     fontSize: 12,
//     marginTop: 5,
//     fontWeight: 'bold'
//   },
//   cardDescription: {
//     fontSize: 12,
//     color: NU_Text_Desc
//   },
//   markerSize: {
//     width: 100,
//     height: 40
//   },
//   markerWrap: {
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });






// // <View  style={card} key={index}>
// //               <Animated.View style={[cardBack, opacityStyleBorder ]} />
// //                 <View>
// //                   <Image
// //                     source={marker.image}
// //                     style={cardImage}
// //                     resizeMode="cover"
// //                   />
// //                   <View style={textContent}>
// //                     <Text numberOfLines={1} style={cardtitle}>
// //                       {marker.title}
// //                     </Text>
// //                     <Text numberOfLines={1} style={cardDescription}>
// //                       {marker.description}
// //                     </Text>
// //                   </View>
// //                   <TouchableOpacity onPress={() => this.onCardClick(marker)}>
// //                     <Text>
// //                       button
// //                     </Text>
// //                   </TouchableOpacity>
// //                   </View>
// //                   </View>

// //                   container: {
// //                     flex: 1
// //                   },
// //                   scrollView: {
// //                     position: 'absolute',
// //                     bottom: 30,
// //                     left: 0,
// //                     right: 0,
// //                     paddingVertical: 10,
// //                   },
// //                   endPadding: {
// //                     paddingRight: phoneWidth - CARD_WIDTH,
// //                   },
// //                   card: {
// //                     padding: 10,
// //                     elevation: 2,
// //                     backgroundColor: NU_Background,
// //                     marginHorizontal: 10,
// //                     shadowColor: NU_Card_Border,
// //                     shadowRadius: 5,
// //                     shadowOpacity: 0.3,
// //                     shadowOffset: { x: 2, y: -2 },
// //                     height: CARD_HEIGHT,
// //                     width: CARD_WIDTH,
// //                     overflow: 'hidden',
// //                     borderRadius: 5,
// //                     alignItems: 'center',
// //                     justifyContent: 'center'
// //                   },
// //                   cardBack: {
// //                     display: 'flex',
// //                     padding: 10,
// //                     elevation: 2,
// //                     backgroundColor: NU_Red,
// //                     marginHorizontal: 10,
// //                     shadowColor: NU_Card_Border,
// //                     shadowRadius: 5,
// //                     shadowOpacity: 0.3,
// //                     // shadowOffset: { x: 2, y: -2 },
// //                     height: CARD_HEIGHT + 2,
// //                     width: CARD_WIDTH + 2,
// //                     // overflow: 'hidden',
// //                     borderRadius: 5
// //                   },
// //                   cardImage: {
// //                     flex: 3,
// //                     width: '100%',
// //                     height: '100%',
// //                     alignSelf: 'center'
// //                   },
// //                   textContent: {
// //                     flex: 1
// //                   },
// //                   cardtitle: {
// //                     fontSize: 12,
// //                     marginTop: 5,
// //                     fontWeight: 'bold'
// //                   },
// //                   cardDescription: {
// //                     fontSize: 12,
// //                     color: NU_Text_Desc
// //                   },
// //                   markerSize: {
// //                     width: 100,
// //                     height: 40
// //                   },
// //                   markerWrap: {
// //                     alignItems: 'center',
// //                     justifyContent: 'center'
// //                   }