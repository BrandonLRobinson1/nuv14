import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList } from 'react-native';
import propTypes from 'prop-types';
import ReviewRow from './ReviewRow';
import StarReview from './StarReview';
import { commonStyles, colors } from '../../../Styles';

const { NU_White, NU_Black, NU_Grey } = colors;

// eslint-disable-next-line
class Reviews extends Component {
  // constructor() {
  //   super();
  // }

  // look into renderItem={({ reviewData }) => <ReviewRow key={Math.random()} reviewData={reviewData} />
  render() {
    const { ratingAvg, title } = this.props;
    const { reviewsBackground, summaryCard, sectionPadding } = styles;
    const { flexCenter, NU_Small_Header_Text } = commonStyles;

    // ***** shouldnt need a check should just since this info should be provided with profile
    const addKeysToReviews = (reviewsSample || []).map((item, index) => ({ ...item, key: `list-key-${index}`}));

    return (
      <View style={reviewsBackground}>
        <ScrollView>
          <View style={[summaryCard, flexCenter]}>
            <View style={sectionPadding}>
              <Text style={NU_Small_Header_Text}>
                {title}
              </Text>
            </View>
            <View>
              <StarReview color={NU_Grey} size={30} score={ratingAvg} />
            </View>
            <View style={sectionPadding}>
              <Text style={NU_Small_Header_Text}>
                {`${ratingAvg}/5.00`}
              </Text>
            </View>
          </View>

          <FlatList
            data={addKeysToReviews}
            renderItem={reviewData => <ReviewRow key={Math.random()} reviewData={reviewData} />}
          />

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reviewsBackground: {
    backgroundColor: NU_Black,
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
    height: '100%'
  },
  summaryCard: {
    backgroundColor: NU_White,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 3
  },
  sectionPadding: {
    paddingTop: 5,
    paddingBottom: 5
  }
});

Reviews.propTypes = {
  ratingAvg: propTypes.number.isRequired,
  title: propTypes.string.isRequired
  // list: propTypes.array.isRequired
};

export default Reviews;

/* eslint-disable */
const reviewsSample = [
  {
    name: "Sam",
    title: 'what a great place',
    reviewScore: 3.7,
    review: "this is a fantaaaaastic shop, i come here every single saturday and I always take my daughter. This is about to be the longest most exiting 3.7 star review of all times for you haters> Yeah you A-A-RON!!!",
    firebaseProfileKey: "DATABAS-LOOK-UP-KEY-DFFAH87323HFSK2",// one option for keeping track of reviews
    timeDate: 'utc time and date stamp maybe from styles or redux',
    displayTime: "4 days ago"
  },
  {
    name: "Sam",
    title: 'what a great place',
    reviewScore: 3.7,
    review: "this is a fantaaaaastic shop, i come here every single saturday and I always take my daughter. This is about to be the longest most exiting 3.7 star review of all times for you haters> Yeah you A-A-RON!!!",
    firebaseProfileKey: "DATABAS-LOOK-UP-KEY-DFFAH87323HFSK2",// one option for keeping track of reviews
    timeDate: 'September 19th, 2019',
    displayTime: "4 days ago"
  },
  {
    name: "Sam",
    title: '',
    reviewScore: 3.7,
    review: "this is a fantaaaaastic shop, i come here every single saturday and I always take my daughter. This is about to be the longest most exiting 3.7 star review of all times for you haters> Yeah you A-A-RON!!!",
    firebaseProfileKey: "DATABAS-LOOK-UP-KEY-DFFAH87323HFSK2",// one option for keeping track of reviews
    timeDate: 'utc time and date stamp maybe from styles or redux',
    displayTime: "4 days ago"
  },
  {
    name: "Sam",
    title: 'what a great place',
    reviewScore: 3.7,
    review: "this is a fantaaaaastic shop, i come here every single saturday and I always take my daughter. This is about to be the longest most exiting 3.7 star review of all times for you haters> Yeah you A-A-RON!!!",
    firebaseProfileKey: "DATABAS-LOOK-UP-KEY-DFFAH87323HFSK2",// one option for keeping track of reviews
    timeDate: 'utc time and date stamp maybe from styles or redux',
    displayTime: "4 days ago"
  },
  {
    name: "Sam",
    title: 'what a great place',
    reviewScore: 3.7,
    review: "this is a fantaaaaastic shop, i come here every single saturday and I always take my daughter. This is about to be the longest most exiting 3.7 star review of all times for you haters> Yeah you A-A-RON!!!",
    firebaseProfileKey: "DATABAS-LOOK-UP-KEY-DFFAH87323HFSK2",// one option for keeping track of reviews
    timeDate: 'utc time and date stamp maybe from styles or redux',
    displayTime: "4 days ago"
  },
  {
    name: "Sam",
    title: 'what a great place',
    reviewScore: 3.7,
    review: "this is a fantaaaaastic shop, i come here every single saturday and I always take my daughter. This is about to be the longest most exiting 3.7 star review of all times for you haters> Yeah you A-A-RON!!!",
    firebaseProfileKey: "DATABAS-LOOK-UP-KEY-DFFAH87323HFSK2",// one option for keeping track of reviews
    timeDate: 'utc time and date stamp maybe from styles or redux',
    displayTime: "4 days ago"
  }
];
