import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createRating } from '../../../helpers/helpersFunctions';

const StarReview = props => {
  const { score, size, color } = props;
  if (!score || score === 0 || score > 5) return (<Text>No Reviews yet, be the first!</Text>); // with styling
  const ratingArray = createRating(score);

  const {
    starRow,
    starIndiv,
    starSpace,
  } = styles; // eslint-disable-line

  return (
    <View style={starIndiv}>
      <View style={starSpace}>
        <Icon name={ratingArray[0] || null} size={size} color={color} />
      </View>
      <View style={starSpace}>
        <Icon name={ratingArray[1] || null} size={size} color={color} />
      </View>
      <View style={starSpace}>
        <Icon name={ratingArray[2] || null} size={size} color={color} />
      </View>
      <View style={starSpace}>
        <Icon name={ratingArray[3] || null} size={size} color={color} />
      </View>
      <View style={starSpace}>
        <Icon name={ratingArray[4] || null} size={size} color={color} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  starRow: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'flex'
  },
  starIndiv: {
    flexDirection: 'row'
  },
  starSpace: {
    margin: 2,
    padding: 2
  }
});

StarReview.propTypes = {
  score: propTypes.number.isRequired,
  size: propTypes.number.isRequired,
  color: propTypes.string.isRequired
};

export default StarReview;
