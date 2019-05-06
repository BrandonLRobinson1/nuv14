import React from 'react';
import { Text, View } from 'react-native';
import {
  CardSection,
  Card
} from '../../../../../common';
import { colors, commonStyles } from '../../../../../Styles';

const { NU_Red } = colors; // eslint-disable-line
const { NU_Header_Text, NU_Paragraph_Text, leftAndRightPadding } = commonStyles; // eslint-disable-line

// conditionally render header and text per legal goc they want to look at
const LegalDoc = ({}) => {

  return (
    <View style={leftAndRightPadding}>
      <Card>
        <CardSection>
          <Text style={NU_Header_Text}>Terms and Conditions</Text>
        </CardSection>

        <CardSection>
          <Text style={NU_Paragraph_Text}>
            Eu duis esse amet ut reprehenderit sint. Culpa excepteur nisi exercitation officia ut laboris adipisicing exercitation amet fugiat ullamco qui qui eiusmod. Lorem qui veniam sit tempor laborum est enim. Est laborum in et culpa nisi nostrud ipsum dolor proident. Reprehenderit aliqua ea tempor ipsum anim velit non tempor aute ea ipsum amet occaecat incididunt. Duis eu pariatur et ipsum commodo velit velit laboris nostrud mollit nulla veniam.
            {'\n'}
            {'\n'}
            Eu duis esse amet ut reprehenderit sint. Culpa excepteur nisi exercitation officia ut laboris adipisicing exercitation amet fugiat ullamco qui qui eiusmod. Lorem qui veniam sit tempor laborum est enim. Est laborum in et culpa nisi nostrud ipsum dolor proident. Reprehenderit aliqua ea tempor ipsum anim velit non tempor aute ea ipsum amet occaecat incididunt. Duis eu pariatur et ipsum commodo velit velit laboris nostrud mollit nulla veniam.
            Eu duis esse amet ut reprehenderit sint. Culpa excepteur nisi exercitation officia ut laboris adipisicing exercitation amet fugiat ullamco qui qui eiusmod. Lorem qui veniam sit tempor laborum est enim. Est laborum in et culpa nisi nostrud ipsum dolor proident. Reprehenderit aliqua ea tempor ipsum anim velit non tempor aute ea ipsum amet occaecat incididunt. Duis eu pariatur et ipsum commodo velit velit laboris nostrud mollit nulla veniam.
          </Text>
        </CardSection>
      </Card>
    </View>
  );
};

export default LegalDoc;
