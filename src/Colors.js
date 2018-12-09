import { StyleSheet } from 'react-native';


export const colors = {
  NU_Red: 'red',
  NU_Blue: 'blue',
  NU_White: 'white',
  NU_Grey: 'lightgrey',
  NU_Black: 'black',
  NU_Pink: 'pink',
  NU_Border_Grey: '#ddd',
  NU_Background: '#FFF',
  NU_Modal_Black: 'rgba(0, 0, 0, .75)',
  NU_Header_Background: '#F8F8F8',
  NU_Card_Border: '#000',
  NU_Text_Desc: '#444',
  NU_Transparent: 'transparent'
};

export const commonStyles = StyleSheet.create({
  NU_Header_Text: {
    fontSize: 26,
    color: colors.NU_Black,
    backgroundColor: colors.NU_Pink
  },
  NU_Small_Header_Text: {
    fontSize: 16,
    color: colors.NU_Black,
    backgroundColor: colors.NU_Pink,
    fontWeight: '700'
  },
  NU_Paragraph_Text: {
    fontSize: 14,
    color: colors.NU_Grey,
    backgroundColor: colors.NU_Blue
  },
  horizontalFlex: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
});
