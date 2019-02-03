import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import propTypes from 'prop-types';
import StarReview from './StarReview';
import { commonStyles, colors } from '../../../Styles';

const { NU_White, NU_Black, NU_Grey, NU_Red  } = colors;

const ReviewRow = props => {
  const { name, review, reviewScore, displayTime, title } = props.reviewData.item; // eslint-disable-line
  const { container } = styles;
  const { NU_Paragraph_Text, NU_Small_Header_Text } = commonStyles;

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
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: NU_White,
    display: 'flex',
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 3
  }
});

ReviewRow.propTypes = {
  reviewData: propTypes.object.isRequired
};

export default ReviewRow;
