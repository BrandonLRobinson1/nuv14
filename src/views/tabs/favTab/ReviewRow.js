import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, ListView } from 'react-native';
// import ReviewRow from './ReviewRow';
import { Card , CardSection } from '../../../common'

const ReviewRow = () => {

  // const { reviewsBackground } = styles;
  console.log('propzzzzzzzzzzzzzzzzzzzzzzzzz', this.props);
  return (
    <Card>
      <CardSection>
        <Text>
          talking
        </Text>
      </CardSection>
    </Card>
  );
}


export default ReviewRow;