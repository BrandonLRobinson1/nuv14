import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { AlbumCard, CardSection, Card, SectionSmall, SectionMedium, Button } from '../../../common';
// import { updateFirstName, updateLastName, updateZipCode } from '../../store/userInfo.user';
import { colors } from '../../../Colors';

class FavoriteItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {}

  render() {
    // eslint-disable-next-line
    const { imageStyle, horizontalFlex, imageContainer, horizontalText, headerStyle } = styles;
    // const { name, description, title, address: { city, state } } = this.props.personData; // eslint-disable-line

    // currently only has {coordinate: {…}, description: "This is the best place in Portland", image: {…}, title: "Best Place"}
    // needs
    // address:{street: "8649 A C Skinner Parkway", details: "App 922", city: "Jacksonville", state: "FL", zip: "33256"}
    // appointments:"idk what to do for this yet"
    // avaialbleNow:false
    // availabily:""
    // coordinate:{latitude: 45.524548, longitude: -122.6749817}
    // customers:[{…}]
    // description:"This is the best place in Portland"
    // id:"xxxxxx"
    // image:null
    // name:"Shizzle Jacklyn"
    // phone:"708-897-2343"
    // qr:{qrStuff: {…}}
    // ratings:[{…}]
    // servicesOffered:["stuff", "stuffy"]
    // title:"Best 2"

    // const { name , description, title, address = { city: 'seattle', state: 'wa' } } = this.props.personData; // eslint-disable-line

    // ********** test filler
    // IMPORTANT THIS BREAKS MAP BC IT RESETS VALUES
    // this.props.personData.address = {street : "8649 A C Skinner Parkway", details : "App 922", city : "Jacksonville", state : "FL", zip : "33256"}
    // this.props.personData.appointments = "idk what to do for this yet"
    // this.props.personData.avaialbleNow = false
    // this.props.personData.availabily = ""
    // this.props.personData.coordinate = {latitude : 45.524548, longitude : -122.6749817}
    // this.props.personData.customers = [{}]
    // this.props.personData.description = "This is the best place in Portland"
    // this.props.personData.id = "xxxxxx"
    // this.props.personData.image = null
    // this.props.personData.name = "Shizzle Jacklyn"
    // this.props.personData.phone = "708-897-2343"
    // this.props.personData.qr = {qrStuff: {}}
    // this.props.personData.ratings = [{}]
    // this.props.personData.servicesOffered = ["stuff", "stuffy"]
    // this.props.personData.title = "Best 2"

    // eslint-disable-next-line
    const { title, description } = this.props.personData;

    return (
      <Card>
        <CardSection>
          <View style={imageContainer}>
            <Image
              source={{ uri: "https://i.imgur.com/K3KJ3w4h.jpg" }}
              style={imageStyle}
            />
          </View>
        </CardSection>

        <CardSection>
          <View style={horizontalFlex}>
            <View style={headerStyle}>
              <Text>
                {title}
              </Text>
            </View>
            <View style={horizontalText}>
              <Text>
                {description}
              </Text>
            </View>
          </View>
        </CardSection>

        <CardSection>
          <Button
            buttonText="View"
            onPress={() => {
              // console.log('Actions', Actions)
              // Actions.pop();
              Actions.ProfilePage({ personData: this.props.personData }); // eslint-disable-line
            }}
          />
        </CardSection>
      </Card>
    )
  }
}

export default connect(
  state => ({
    // firstName: state.userInfo.user.firstName
  }),
  {
    // updateFirstName,
  }
)(FavoriteItem);

const { NU_White, NU_Grey, NU_Pink } = colors; // eslint-disable-line

const styles = StyleSheet.create({
  circleContainer: {
    height: '13%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: NU_Grey
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
  horizontalFlex: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  headerStyle: {
    backgroundColor: NU_Pink,
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  horizontalText: {
    backgroundColor: NU_White,
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
