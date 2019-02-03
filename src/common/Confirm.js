import React from 'react';
import { Text, View, Modal } from 'react-native';
import propTypes from 'prop-types';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { colors } from '../Styles';

const { NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black, NU_Modal_Black } = colors;

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { cardSectiontyle, textStyle, containerStyle } = styles;

  console.log('chilly', children)

  return (
    <Modal
      visible={visible}
      transparent
      animationType="Slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectiontyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </CardSection>

        <CardSection>
          <Button onPress={onAccept}>
            Yes
          </Button>
          <Button onPress={onDecline}>
            No
          </Button>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectiontyle:{
    jusifyContent: 'center'
  },
  textStyle:{
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle:{
    backgroundColor: NU_Modal_Black,
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

Confirm.propTypes = {
  onAccept: propTypes.func.isRequired,
  onDecline: propTypes.func.isRequired,
  visible: propTypes.string.isRequired,
  children: propTypes.string.isRequired
};

export default Confirm;
