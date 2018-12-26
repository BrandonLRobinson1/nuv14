import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import CustomMarker from './CustomMarker';
import { FullCard, Spinner } from '../../../common';
import { setCurrentLocation, getActiveNailTechs, getinitialDelta } from '../../../store/location/locationServices';
import { colors } from '../../../Colors';

const Images = [
  { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
  { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
  { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
  { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
];

// phone dimensions *****
const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latDelta = 0.0622; // .0922
const longDelta = aspectRatio * latDelta;

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
// *****

// TODO need to add a button over map to take you to current or zip code saved location
class Maptab extends Component {
  constructor() {
    super();

    this.state = {
      markers: null,
      initialPosition: null
    };

    this.renderMarkers = this.renderMarkers.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
    this.getLocationInformation = this.getLocationInformation.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    navigator.geolocation.clearWatch(this.watchID); // eslint-disable-line
    this.timer();
  }

  // maybe get it down to this .. will have to check and render info if it is available
  componentDidMount() {
    console.log('component will mount in maptab run')
    const { getActiveNailTechs, getinitialDelta, setCurrentLocation, regionObj } = this.props; // eslint-disable-line

    // currently get active nailtechs run depends on a successful call to getuserinfo in router, so on final timer reset may need to call
    // HUGE** get active nail techs is its OWN THING bc in the future itll have its own call to google to get active people,
    // this for now will have to be recalled to be updated until we can run a watch on it
    if (!Array.isArray(this.props.savedTechs)) this.props.getActiveNailTechs();

    // ****** if you have required info cancel timer and call function that renders map
    return;
  }

  componentWillUnmount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    navigator.geolocation.clearWatch(this.watchID); // eslint-disable-line
    this.regionTimeout = 0;
    this.timer = 0;
    console.log('UNMOUNT');
  }

  // eslint-disable-next-line
  onCardClick (person) {
  // capture info for confirmed visit and details in the redux on they book apt, build big info obj
    console.log('marker', person);
  }

  // need to run the same logic a componentwillmount to fetch information
  getLocationInformation() {
    let { getActiveNailTechs, getinitialDelta, setCurrentLocation, regionObj, deltas, savedTechs } = this.props;

    const markers = savedTechs;
    const init = deltas;

    // *** above should be called before this component loads

    const dt = new Date();
    const utcDate = dt.toUTCString(); // unique timestamp with date

    if (regionObj !== 'PRIVATE_LOCATION') { // need to check for private region info not FALSY
      console.log('fired 4 - location isnt private', regionObj, init, markers);

      const initialRegion = {
        latitude: regionObj.latitude,
        longitude: regionObj.longitude,
        latitudeDelta: init.latitudeDelta || latDelta,
        longitudeDelta: init.longitudeDelta || longDelta
      };

      console.log('🌎initialRegion1', initialRegion);

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

        console.log('🌎initialRegion2', initialRegion);

        this.setState({
          initialPosition: initialRegion, // if you want ur stRTING POINT TO BE A central location beteen markers and not yourself
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
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
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


  renderMarkers(marker, index) {
    const { markerWrap, markerSize } = styles;
    // this is the snippet of code that is reponsible for what paticlular marker is zoomed in on
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH)
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
      return { scale, opacity };
    });

    const scaleStyle = {
      transform: [
        {
          scale: interpolations[index].scale
        },
      ],
    };
    const opacityStyle = {
      opacity: interpolations[index].opacity
    };

    return (
      <MapView.Marker key={index} coordinate={marker.coordinate}>
        <Animated.View style={[markerWrap, opacityStyle, scaleStyle, markerSize]}>
          <CustomMarker />
        </Animated.View>
      </MapView.Marker>
    );
  }


  renderCards(marker, index) {
    // tried to make seperate component out of this, will not work please leave alone
    const {
      card,
      cardImage,
      textContent,
      cardtitle,
      cardDescription
    } = styles;

    return (
      <View style={card} key={index}>
        <Image
          source={marker.image}
          style={cardImage}
          resizeMode="cover"
        />
        <View style={textContent}>
          <Text numberOfLines={1} style={cardtitle}>
            {marker.title}
          </Text>
          <Text numberOfLines={1} style={cardDescription}>
            {marker.description}
          </Text>
        </View>
        <TouchableOpacity onPress={() => this.onCardClick(marker)}>
          <Text>
            button
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  timer() {
// ******************************************************* if you turn on userFetch ioff in router then infinite loop - FIXXXXXXXXXXXXXXXXXX TODO
    const myInterval = setInterval(() => {
      console.log('started')
      if (this.props.savedTechs && this.props.regionObj && this.props.deltas) {
        console.log('timer stopped 🛑');
        clearInterval(myInterval);
        return this.getLocationInformation();
      }
      console.log('rerunning timer function ⛳');
      if (!Array.isArray(this.props.savedTechs)) this.props.getActiveNailTechs();
      this.props.getinitialDelta();
    // }, 1500);
    }, 500);
  }

  render() {
    const { container, scrollView, endPadding } = styles;
    const { initialPosition, markers } = this.state;
    const { NU_White } = colors;

    console.log('maptab rerender - render amount direct affected by timer');

    if (!initialPosition || !markers) return ( // TODO write code to have option if you only have a zip code bc location is turned on
      <FullCard>
        <Spinner />
      </FullCard>
    );

    return (
      <View style={container}>

        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => this.map = map} // eslint-disable-line
          initialRegion={initialPosition}
          style={container}
        >

          { markers.map(this.renderMarkers) }

          {/* below is an optional your location marker */}

          <MapView.Marker coordinate={initialPosition} pinColor={NU_White} />

        </MapView>

        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator
          snapToInterval={CARD_WIDTH}
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

          { markers.map(this.renderCards) }

        </Animated.ScrollView>

      </View>
    );
  }
}

// export default connect(
//   state => ({
//     regionObj: state.location.locationServices.regionObj,
//     savedTechs: state.location.locationServices.savedTechs,
//     deltas: state.location.locationServices.deltas
//     // favorites: state.userInfo.user.favorites // be sure to change this where ever the markers are in the code so that it listens for the prop that gets the map info to renender when waiting
//   }),
//   {
//     setCurrentLocation,
//     getActiveNailTechs,
//     getinitialDelta
//   }
// )(Maptab);

export default connect(
  state => {
    console.log('state', state)
    return {
    regionObj: state.location.locationServices.regionObj,
    savedTechs: state.location.locationServices.savedTechs,
    deltas: state.location.locationServices.deltas,
    favorites: state.userInfo.user.favorites // be sure to change this where ever the markers are in the code so that it listens for the prop that gets the map info to renender when waiting
  }},
  {
    setCurrentLocation,
    getActiveNailTechs,
    getinitialDelta
  }
)(Maptab);

const { NU_Red, NU_White, NU_Transparent, NU_Background, NU_Card_Border, NU_Text_Desc } = colors; // eslint-disable-line

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
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: NU_Background,
    marginHorizontal: 10,
    shadowColor: NU_Card_Border,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
    borderRadius: 5
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold'
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
  }
});
