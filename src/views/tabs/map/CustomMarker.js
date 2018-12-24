import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { colors, commonStyles } from '../../../Colors';

export default CustomMarker = () => {
  const {
    customMarkerShell,
    customMarker,
    customMarkerText,
    customMarkerTailShell,
    customMarkerTail
  } = styles;

  return (
    <View style={customMarkerShell}>
      <View style={customMarker}>
        <Text style={customMarkerText}>
          NU
        </Text>
      </View>
      <View style={customMarkerTailShell}>
        <View style={customMarkerTail} />
      </View>
    </View>
  );
}

const { NU_Red , NU_Blue, NU_White, NU_Grey, NU_Border_Grey, NU_Transparent } = colors; // eslint-disable-line

const styles = StyleSheet.create({
  customMarkerShell: {
    width: 40,
    height: 30,
    display: 'flex',
    flexDirection: 'column'
  },
  customMarker: {
    flex: 2,
    backgroundColor: NU_Red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  customMarkerTailShell: {
    flex: 1,
    backgroundColor: NU_Transparent,
    alignItems: 'center'
  },
  customMarkerTail: {
    width: 0,
    height: 0,
    backgroundColor: NU_Transparent,
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 11,
    borderLeftColor: NU_Transparent,
    borderRightColor: NU_Transparent,
    borderBottomColor: NU_Red,
    transform: [
      {
        rotate: '180deg'
      }
    ]
  },
  customMarkerText: {
    color: NU_White,
    fontSize: 11
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerSize: {
    width: 100,
    height: 40
  }
});