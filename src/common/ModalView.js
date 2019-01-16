import React from 'react';
import { Text, Modal, View, StyleSheet } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { colors } from '../Styles'

const ModalView = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, cardSectionStyle } = styles;
  return (
    <Modal
      visible={visible}
      trasnparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </CardSection>

        <CardSection>
          <Button onPress={onAccept} buttonText="Yes" />
          <Button onPress={onDecline} buttonText="No" />
        </CardSection>
      </View>
    </Modal>
  )
}

const { NU_Red } = colors;

const styles = StyleSheet.create({
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    // backgroundColor: NU_Red
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
});

export { ModalView };