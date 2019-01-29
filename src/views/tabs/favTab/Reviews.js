const reviewsSample = [
  {
    name: "Sam",
    reviewScore: 3.7,
    review: "this is a fantaaaaastic shop, i come here every single saturday and I always take my daughter. This is about to be the longest most exiting 3.7 star review of all times for you haters> Yeah you A-A-RON!!!",
    firebaseProfileKey: "DATABAS-LOOK-UP-KEY-DFFAH87323HFSK2",// one option for keeping track of reviews
    timeDate: 'utc time and date stamp maybe from styles or redux',
    displayTime: "4 days ago"
  },
  {
    name: "Sam",
    reviewScore: 3.7,
    review: "this is a fantaaaaastic shop, i come here every single saturday and I always take my daughter. This is about to be the longest most exiting 3.7 star review of all times for you haters> Yeah you A-A-RON!!!",
    firebaseProfileKey: "DATABAS-LOOK-UP-KEY-DFFAH87323HFSK2",// one option for keeping track of reviews
    timeDate: 'utc time and date stamp maybe from styles or redux',
    displayTime: "4 days ago"
  },
  {
    name: "Sam",
    reviewScore: 3.7,
    review: "this is a fantaaaaastic shop, i come here every single saturday and I always take my daughter. This is about to be the longest most exiting 3.7 star review of all times for you haters> Yeah you A-A-RON!!!",
    firebaseProfileKey: "DATABAS-LOOK-UP-KEY-DFFAH87323HFSK2",// one option for keeping track of reviews
    timeDate: 'utc time and date stamp maybe from styles or redux',
    displayTime: "4 days ago"
  },
  {
    name: "Sam",
    reviewScore: 3.7,
    review: "this is a fantaaaaastic shop, i come here every single saturday and I always take my daughter. This is about to be the longest most exiting 3.7 star review of all times for you haters> Yeah you A-A-RON!!!",
    firebaseProfileKey: "DATABAS-LOOK-UP-KEY-DFFAH87323HFSK2",// one option for keeping track of reviews
    timeDate: 'utc time and date stamp maybe from styles or redux',
    displayTime: "4 days ago"
  }
];

import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, ListView, Spinner } from 'react-native';
import ReviewRow from './ReviewRow';
import { Card , CardSection, FullCard } from '../../../common'

class Reviews extends Component {
  constructor() {
    super();

    this.getReviews = this.getReviews.bind(this);
  }

  getReviews() {
    // console.log('propzzzzzzzzzzzzzzzzzzzzzzzzz', this.props.reviews);
    // **** info should come from log above TODO
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 // eslint-disable-line
    });
    this.dataSource = ds.cloneWithRows(reviewsSample);
  }

  render () {
    this.getReviews();
    const { reviewsBackground } = styles;
    console.log('☀️☀️☀️☀️☀️☀️ propzzzzzzzzzzzzzzzzzzzzzzzzz', this.props);

    if (!this.dataSource) return ( // eslint-disable-line
      <FullCard>
        <Spinner />
      </FullCard>
    );

    return (
      <View style={reviewsBackground}>
        <ScrollView>
          <Card>
            <CardSection>
              <Text>
                *****
              </Text>
            </CardSection>
          </Card>

          <ListView
            dataSource={this.dataSource}
            renderRow={ReviewData => <ReviewRow key={Math.random()} ReviewData={'ReviewData'} />}
          />

        </ScrollView>
      </View>
    );
  }
}

export default Reviews;


const styles = StyleSheet.create({
  reviewsBackground: {
    backgroundColor: 'black',
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
    height: '100%'
  }
});



