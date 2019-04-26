import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class PictureUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      photo: null
    };
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
  }

  handleChoosePhoto() {
    const options = {
      noData: true
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  }
  // https://www.npmjs.com/package/react-native-fetch-blob#user-content-installation

  render() {
    const { photo } = this.state;
    console.log('photo', photo);
    console.log('ImagePicker', ImagePicker.showImagePicker);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={() => this.handleChoosePhoto()} />
      </View>
    );
  }
};
