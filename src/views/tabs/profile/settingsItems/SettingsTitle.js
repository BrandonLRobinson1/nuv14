import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const SettingsTitle = ({name}) => {

  const { row, itemName } = styles;
  return (
    <View style={row}>
      <View style={itemName}>
        <Text>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    height: 40,
    fontSize: 14,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  itemName: {
    backgroundColor: 'blue',
    paddingLeft: 10
  },

});

export default SettingsTitle;