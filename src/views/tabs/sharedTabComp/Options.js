import React, { Component } from 'react';
import propTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
import { CardSection, Card, Button } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

const { NU_Green, NU_Grey, NU_Pink, NU_Border_Grey } = colors; // eslint-disable-line
const { NU_Paragraph_Text, NU_Small_Header_Text, leftAndRightPadding } = commonStyles; // eslint-disable-line

const timesArr = [
  {
    time: '4:30',
    date: '09/19/2019',
    moreUsefulInfo: 'stuff'
  },
  {
    time: '4:30',
    date: '09/19/2019',
    moreUsefulInfo: 'stuff'
  },
  {
    time: '4:31',
    date: '09/19/2019',
    moreUsefulInfo: 'stuff'
  },
  {
    time: '4:33',
    date: '09/19/2019',
    moreUsefulInfo: 'stuff'
  }
];

// time array passed in, shop name should be in header
class Options extends Component {
  optionsCard = stuff => {
    const { item: { time, date } } = stuff;
    const { container, iconFlex, textFlex } = styles;
    return (
      <Card>
        <CardSection>
          <View style={container}>
            <View style={iconFlex}>
              <Icon name="clock" size={18} color={NU_Green} />
            </View>
            <View style={textFlex}>
              <Text style={NU_Small_Header_Text}>{time}</Text>
            </View>
          </View>
        </CardSection>
        <CardSection>
          <View style={container}>
            <View style={iconFlex}>
              <Icon name="calendar" size={18} color={NU_Green} />
            </View>
            <View style={textFlex}>
              <Text style={NU_Paragraph_Text}>{date}</Text>
            </View>
          </View>
        </CardSection>
        <CardSection>
          <Button
            buttonText="Book Appointment"
            onPress={() => {
              // TODO ⭐ modal asks, are you sure you want to book st pierra nails at 7:30pm? if yes ---->>>
              // packages comes from nailtech object, may use redux to pluck
              Actions.MakeAppointment({ timeOfChoice: time, packages: undefined });
            }}
          />
        </CardSection>
      </Card>
    );
  }

  render() {
    console.log('how many times does options render?')
    const timesWithKeys = timesArr.map((item, index) => ({ ...item, key: `list-key-${index}` }));
    // if (!timesWithKeys.length) {
      // sorry no data to display - ToDO
    // }
    return (
      <FlatList
        data={timesWithKeys}
        renderItem={aptData => this.optionsCard(aptData)}
        style={leftAndRightPadding}
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%'
  },
  iconFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textFlex: {
    flex: 9
  }
});

Options.propTypes = {
  times: propTypes.array.isRequired, // eslint-disable-line
  title: propTypes.string.isRequired // eslint-disable-line
};

export default Options;
