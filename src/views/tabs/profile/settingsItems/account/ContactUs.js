import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import {
  CardSection,
  Card
} from '../../../../../common';
import { colors, commonStyles } from '../../../../../Styles';

const { NU_Red , NU_Blue, NU_White, NU_Grey, NU_Border_Grey, NU_Transparent } = colors; // eslint-disable-line
const { NU_Header_Text, NU_Paragraph_Text, leftAndRightPadding } = commonStyles; // eslint-disable-line

// conditionally render header and text per legal goc they want to look at
const ContactUs = ({}) => {
  const itachi = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLgejngJJnK5fqFKvTtZOp21aGI9GBkYtXKIq3Y9wIF25kbGYZJQ';
  const { imageCardSectionContainer, imageContainer, imageStyle} = styles; // eslint-disable-line

  return (
    <View style={leftAndRightPadding}>
      <Card>
        <CardSection style={imageCardSectionContainer}>
          <View style={imageContainer}>
            <Image
              source={{ uri: itachi }}
              style={imageStyle}
            />
          </View>
        </CardSection>
        <CardSection>
          <Text style={NU_Header_Text}>We want to hear from you!</Text>
        </CardSection>

        <CardSection>
          <Text style={NU_Paragraph_Text}>
            Eu duis esse amet ut reprehenderit sint. Culpa excepteur nisi exercitation officia ut laboris adipisicing exercitation amet fugiat Eu duis esse amet ut reprehenderit sint. Culpa excepteur nisi exercitation officia ut laboris adipisicing exercitation amet fugiat Eu duis esse amet ut reprehenderit sint. Culpa excepteur nisi exercitation officia ut laboris adipisicing exercitation amet fugiat
            {'\n'}
            {'\n'}
            info@reprehenderit.com
          </Text>
        </CardSection>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default ContactUs;
