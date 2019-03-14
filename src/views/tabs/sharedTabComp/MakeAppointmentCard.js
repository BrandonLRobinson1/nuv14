import React, { Component } from 'react';
import propTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// import { Actions } from 'react-native-router-flux';
import { CardSection, Card, Button, ModalView } from '../../../common';
import { colors, commonStyles } from '../../../Styles';

const { NU_Green, NU_Grey, NU_Pink, NU_Border_Grey } = colors; // eslint-disable-line
const { NU_Paragraph_Text, NU_Small_Header_Text, leftAndRightPadding } = commonStyles; // eslint-disable-line


// time array passed in, shop name should be in header
class MakeAppointmentCard extends Component {
  constructor() {
    super();
    this.state = {
      bookAppointment: false
    };
  }

  componentWillUnmount() {
    this.setState({ bookAppointment: false });
  }

  render() {
    const { packageName, description, tokens } = this.props.serviceOffered;
    const { containter, textFlex, tokenFlex} = styles;
    const { showMore } = this.state;
    return (
      <View style={leftAndRightPadding}>
        <Card>
          <CardSection>
            <View style={containter}>
              <View style={textFlex}>
                <Text style={NU_Small_Header_Text}>
                  {
                    packageName.length < 20 ? packageName : `${packageName.substring(0, 20)}...`
                  }
                </Text>
              </View>
              <View style={tokenFlex}>
                <Text style={NU_Paragraph_Text}>
                  {tokens}
                  +icon
                </Text>
              </View>
            </View>
          </CardSection>

          <CardSection>
            <View style={containter}>
              <View style={textFlex}>
                <Text style={NU_Paragraph_Text}>
                  {description}
                </Text>
              </View>
            </View>
          </CardSection>

          <CardSection>
            <Button
              buttonText={packageName.length < 20 ? `Book ${packageName}` : `Book ${packageName.substring(0, 20)}...`}
              onPress={() => this.setState({ bookAppointment: true })}
            />
          </CardSection>

          <ModalView
            visible={this.state.bookAppointment}
            onAccept={() => console.log('accept')}
            onDecline={() => this.setState({ bookAppointment: false })}
          >
            Are you sure you would like to book
            {` ${packageName}?`}
          </ModalView>
        </Card>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containter: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%'
  },
  tokenFlex: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textFlex: {
    flex: 7
  }
});

MakeAppointmentCard.propTypes = {
  packageName: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  tokens: propTypes.number.isRequired
};

export default MakeAppointmentCard;
