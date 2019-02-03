import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, commonStyles } from '../../../../Styles';

const SettingsList = ({ name, sceneLocation }) => {
  const { row, itemName, icon } = styles;
  const { NU_Blue } = colors;
  const { NU_Paragraph_Text } = commonStyles;
  return (
    <View style={row}>
      <View style={itemName}>
        <Text style={NU_Paragraph_Text}>
          {name}
        </Text>
      </View>
      <View style={icon}>
        <Text onPress={() => { Actions[sceneLocation]() }}>
          <Icon name="chevron-right" size={20} color={NU_Blue} />
        </Text>
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
    justifyContent: 'center',
    paddingLeft: 10
  },
  icon: {
    flex: 1,
    backgroundColor: NU_Red,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

SettingsList.propTypes = {
  name: propTypes.string.isRequired,
  sceneLocation: propTypes.string.isRequired
};

export default SettingsList;
