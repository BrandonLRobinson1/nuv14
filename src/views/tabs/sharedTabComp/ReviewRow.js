import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, ListView } from 'react-native';
import StarReview from './StarReview';
import { commonStyles, colors } from '../../../Styles';

const ReviewRow = (props) => {
  const { name, review, reviewScore, displayTime, title } = props.reviewData.item;
  // const { reviewsBackground } = styles;

  const { container } = styles;
  const { NU_Paragraph_Text, NU_Small_Header_Text } = commonStyles;
  const { NU_Grey, NU_Red } = colors;

  return (
    <View style={container}>
      <View>
        <StarReview color={NU_Red} size={15} score={reviewScore} />
      </View>
      <View>
        <Text style={NU_Small_Header_Text}>
          {title}
        </Text>
      </View>
      <View>
        <Text style={NU_Paragraph_Text}>
          {review}
        </Text>
      </View>
      <View>
        <Text style={[NU_Paragraph_Text, { color: NU_Red }]}>
          {displayTime}
        </Text>
      </View>
    </View>
  );
}


export default ReviewRow;

const { NU_White, NU_Black } = colors;

const styles = StyleSheet.create({
  container: {
    backgroundColor: NU_White,
    display: 'flex',
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 3
  },
});