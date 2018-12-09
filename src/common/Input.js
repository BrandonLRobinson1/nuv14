import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { colors } from '../Colors';

const Input = ({ label, onChangeText, value, placeholder, secureTextEntry, editable = true, keyboardType = 'default', maxLength = null, clearTextOnFocus = false }) => ( // what to pass in
  <View style={styles.containerStyle}>
    <Text style={styles.labelStyle}>{label}</Text>
    <TextInput
      clearTextOnFocus={clearTextOnFocus}
      maxLength={maxLength}
      editable={editable}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCorrect={false}
      style={styles.inputStyle}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const { NU_Black } = colors;

const styles = StyleSheet.create({
  inputStyle : {
    color: NU_Black,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export { Input };