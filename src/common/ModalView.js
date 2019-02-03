import React from 'react';
import { Text, Modal, View, StyleSheet } from 'react-native';
import propTypes from 'prop-types';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { colors } from '../Styles';

// eslint-disable-next-line
const { NU_Red, NU_Black } = colors;

// eslint-disable-next-line
const ModalView = ({ children, visible, onAccept, onDecline }) => {
// eslint-disable-next-line
  const { containerStyle, textStyle, cardSectionStyle, modalBottom } = styles;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </CardSection>

        <CardSection style={modalBottom}>
          <Button onPress={onAccept} buttonText="Yes" />
          <Button onPress={onDecline} buttonText="No" />
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cardSectionStyle: {
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: NU_Black,
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  modalBottom: { // goes on the very last class
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  }
});

ModalView.propTypes = {
  visible: propTypes.string.isRequired,
  onAccept: propTypes.func.isRequired,
  onDecline: propTypes.func.isRequired
};

export { ModalView };
