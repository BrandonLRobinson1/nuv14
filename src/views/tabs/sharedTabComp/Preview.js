import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import propTypes from 'prop-types';
import { CardSection, Card, Button } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

const { NU_White, NU_Grey, NU_Pink, NU_Border_Grey } = colors; // eslint-disable-line

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
      imageCardSectionContainer,
      cardBottom
    } = styles;

    const { item : personData } = this.props.personData; // eslint-disable-line
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

        <CardSection style={cardBottom}>
          <Button
            buttonText="View"
            onPress={() => {
              Actions.ProfilePage({ personData });
            }}
          />
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  horizontalFlex: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  imageCardSectionContainer: {
    padding: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden'
  },
  imageContainer: {
    minHeight: 120,
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
  cardBottom: {
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  }
});

Preview.propTypes = {
  personData: propTypes.object.isRequired
};

export default connect(
  state => ({
    // firstName: state.userInfo.user.firstName
  }),
  {
    // updateFirstName,
  }
)(Preview);
