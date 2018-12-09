import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { colors } from '../../../../Colors';



const SettingsList = ({name, sceneLocation}) => {

  const { row, itemName, icon, font } = styles;
  return (
    <View style={row}>
      <View style={itemName}>
        <Text style={font}>{name}</Text>
      </View>
      <View style={icon}>
        <Text onPress={() => { Actions[sceneLocation]() }}> > icon </Text>
      </View>
    </View>
  );
};

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors; // eslint-disable-line

const styles = StyleSheet.create({
  row: {
    flex: 1,
    height: 35,
    backgroundColor: NU_Grey,
    display: 'flex',
    flexDirection: 'row'
  },
  itemName: {
    flex: 5,
    backgroundColor: NU_Blue,
    justifyContent: 'center',
    paddingLeft: 10
  },
  icon: {
    flex: 1,
    backgroundColor: NU_Red,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10
  },
  font: {
    fontSize: 14,
  }
});

export default SettingsList;