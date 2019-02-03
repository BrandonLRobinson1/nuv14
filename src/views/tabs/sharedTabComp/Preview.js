import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { AlbumCard, CardSection, Card, SectionSmall, SectionMedium, Button } from '../../../common';
// import { updateFirstName, updateLastName, updateZipCode } from '../../store/userInfo.user';
import { colors, commonStyles } from '../../../Styles';

class Preview extends Component {
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
      imageCardSectionContainer
    } = styles;

    const { item : personData  } = this.props.personData;
    // const personData = item;\
    console.log('🔥 -----', personData)


    const { NU_Header_Text, NU_Paragraph_Text } = commonStyles;

    return (
      <Card>
        <CardSection style={imageCardSectionContainer}>
          <View style={imageContainer}>
            <Image
              source={personData.image}
              style={imageStyle}
            />
          </View>
        </CardSection>

        <CardSection>
          <View style={horizontalFlex}>
            <View>
              <Text style={NU_Header_Text}>
                {personData.title}
              </Text>
            </View>
            <View>
              <Text style={NU_Paragraph_Text}>
                {personData.description}
              </Text>
            </View>
          </View>
        </CardSection>

        <CardSection>
          <Button
            buttonText="View"
            onPress={() => {
              Actions.ProfilePage({ personData });
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
)(Preview);

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