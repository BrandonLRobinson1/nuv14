import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class DiscoverMain extends React.Component {
  constructor() {
    super();
    this.state = {
      photo: null,
    };
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
  }

  handleChoosePhoto() {
    const options = {
      noData: true,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

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


// import React, { Component } from "react";
// import { Text, View, TextInput, Image } from "react-native";
// import firebase from "firebase";
// import FileUploader from "react-firebase-file-uploader";

// class DiscoverMain extends Component {
//   state = {
//     username: "",
//     avatar: "",
//     isUploading: false,
//     progress: 0,
//     avatarURL: ""
//   };

//   handleChangeUsername = event =>
//     this.setState({ username: event.target.value });
//   handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
//   handleProgress = progress => this.setState({ progress });
//   handleUploadError = error => {
//     this.setState({ isUploading: false });
//     console.error(error);
//   };
//   handleUploadSuccess = filename => {
//     this.setState({ avatar: filename, progress: 100, isUploading: false });
//     firebase
//       .storage()
//       .ref("images")
//       .child(filename)
//       .getDownloadURL()
//       .then(url => this.setState({ avatarURL: url }));
//   };

//   render() {

//     return (
//       <View>
//           <Text>Username:</Text>
//           <TextInput
//             value={this.state.username}
//             name="username"
//             onChange={this.handleChangeUsername}
//           />
//           <Text>Avatar:</Text>

//           {this.state.isUploading ? <Text>Progress: {this.state.progress}</Text> : null}
//           {this.state.avatarURL ? <Image src={this.state.avatarURL} /> : null }

//           <FileUploader
//             accept="image/*"
//             name="avatar"
//             randomizeFilename
//             storageRef={firebase.storage().ref("images")}
//             onUploadStart={this.handleUploadStart}
//             onUploadError={this.handleUploadError}
//             onUploadSuccess={this.handleUploadSuccess}
//             onProgress={this.handleProgress}
//           />
//       </View>
//     );
//   }
// }

// export default DiscoverMain;