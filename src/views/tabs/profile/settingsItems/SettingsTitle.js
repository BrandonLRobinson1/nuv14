import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import propTypes from 'prop-types';
import { commonStyles } from '../../../../Styles';

const SettingsTitle = ({ name }) => {
  const { NU_Small_Header_Text } = commonStyles;
  const { row, itemName } = styles;
  return (
    <View style={row}>
      <View style={itemName}>
        <Text style={NU_Small_Header_Text}>
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  itemName: {
    paddingLeft: 10
  }
});

SettingsTitle.propTypes = {
  name: propTypes.string.isRequired
};

export default SettingsTitle;


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';


// const SettingsTitle = ({name}) => {

//   const { row, itemName } = styles;
//   return (
//     <View style={row}>
//       <View style={itemName}>
//         <Text>{name}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   row: {
//     flex: 1,
//     height: 40,
//     fontSize: 14,
//     backgroundColor: 'green',
//     justifyContent: 'center',
//     alignItems: 'flex-start'
//   },
//   itemName: {
//     backgroundColor: 'blue',
//     paddingLeft: 10
//   },

// });

// export default SettingsTitle;