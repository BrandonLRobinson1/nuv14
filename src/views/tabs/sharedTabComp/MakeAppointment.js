import React, { Component } from 'react';
import propTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// import { Actions } from 'react-native-router-flux';
import MakeAppointmentCard from './MakeAppointmentCard';
import { CardSection, Card, Button } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

const { NU_Green, NU_Grey, NU_Pink, NU_Border_Grey } = colors; // eslint-disable-line
const { NU_Paragraph_Text, NU_Small_Header_Text } = commonStyles; // eslint-disable-line

// time array passed in, shop name should be in header
export const MakeAppointment = (/* { packages, timeOfChoice } */) => {
  const { manicure, pedicure, manicureAndPedicure } = packages;
  return (
    <View>
      <ScrollView>
        {manicure.length ? (
          <View>
            <Text>Manicure</Text>
            {manicure.map((serciveItem, i) => <MakeAppointmentCard key={i} serviceOffered={serciveItem} />)}
          </View>
        ) : null}
        {pedicure.length ? (
          <View>
            <Text>Pedicure</Text>
            {pedicure.map((serciveItem, i) => <MakeAppointmentCard key={i} serviceOffered={serciveItem} />)}
          </View>
        ) : null}
        {manicureAndPedicure.length ? (
          <View>
            <Text>Manicure and Pedicure</Text>
            {manicureAndPedicure.map((serciveItem, i) => <MakeAppointmentCard key={i} serviceOffered={serciveItem} />)}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};


MakeAppointment.propTypes = {
  packages: propTypes.object.isRequired // eslint-disable-line
};

export default MakeAppointment;

const packages = {
  manicure: [
    {
      packageName: 'Seaside Manicure',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tokens: 97
    }
  ],
  pedicure: [
    {
      packageName: 'Seaside Pedicure',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tokens: 80
    },
    {
      packageName: 'NawfSide Pedicure',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tokens: 35
    }
  ],
  manicureAndPedicure: [
    {
      packageName: 'Seaside Manicure and Pedicure',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tokens: 185
    }
  ]
};
