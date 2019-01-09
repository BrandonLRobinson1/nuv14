import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { AlbumCard, CardSection, Card, SectionSmall, SectionMedium, Button } from '../../../common';
// import { updateFirstName, updateLastName, updateZipCode } from '../../store/userInfo.user';
import { colors } from '../../../Styles';

class FavoriteItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {}

  render() {
    // eslint-disable-next-line
    const {
      imageStyle,
      horizontalFlex,
      imageContainer,
      horizontalText,
      headerStyle,
      imageCardSectionContainer
    } = styles;

    const { title, description } = this.props.personData;

    return (
      <Card>
        <CardSection style={imageCardSectionContainer}>
          <View style={imageContainer}>
            <Image
              source={this.props.personData.image}
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

const { NU_White, NU_Grey, NU_Pink, NU_Border_Grey } = colors; // eslint-disable-line

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
  },

  imageCardSectionContainer: {
    padding: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
    shadowColor: NU_Border_Grey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5
  },
  imageContainer: {
    minHeight: 120,
    flex: 2,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: NU_White,

  },
  imageStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: NU_White,
    resizeMode: 'cover'
  }
});