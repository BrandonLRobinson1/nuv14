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
}


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





























// working discover

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { FlatList } from 'react-native';
// import propTypes from 'prop-types';
// import { getAppData, setFavorites } from '../../../store/userInfo/user';
// import Preview from '../sharedTabComp/Preview';
// import Oops from '../sharedTabComp/Oops';
// import { FullCard, Spinner } from '../../../common';
// import { commonStyles } from '../../../Styles';

// const { leftAndRightPadding } = commonStyles;

// class DiscoverMain extends Component {
//   constructor() {
//     super();

//     this.state = {
//       apiCallCounter: 0
//     };

//     this.getDiscoverData = this.getDiscoverData.bind(this);
//     this.refetchButton = this.refetchButton.bind(this);
//   }

//   componentDidMount() {
//     this.getDiscoverData();
//   }

//   async getDiscoverData() { // eslint-disable-line
//     const { getAppData, favorites, appDataLoading } = this.props; // eslint-disable-line
//     const { apiCallCounter } = this.state;
//     const isArr = Array.isArray(favorites);

//     if (apiCallCounter >= 3 || isArr) return 0;

//     if (appDataLoading) {
//       console.log('--loading');
//       await this.setState({ apiCallCounter: apiCallCounter + 1 });
//       return setTimeout(() => this.getDiscoverData(), 1500);
//     }

//     if (!isArr) {
//       console.log('--fetching');
//       await this.setState({ apiCallCounter: apiCallCounter + 1 });
//       await getAppData();
//       return setTimeout(() => this.getDiscoverData(), 750);
//     }
//   }

//   async refetchButton() {
//     const { favorites, setFavorites } = this.props;
//     const isArr = Array.isArray(favorites);

//     if (!isArr) setFavorites(''); // 🚨 <== will change from setFavorites to whereever appdata function pulls from
//     await this.setState({ apiCallCounter: 0 });
//     return this.getDiscoverData();
//   }

//   render() {
//     console.log('🔥🔥🔥🔥');
//     const { favorites } = this.props;
//     const { apiCallCounter } = this.state;
//     const isArr = Array.isArray(favorites);

//     if (apiCallCounter >= 3) {
//       return (
//         <Oops
//           compName="Discover Page"
//           retry={() => this.refetchButton()}
//         />
//       );
//     }

//     if (isArr && favorites.length > 1) {
//       const addKeysList = favorites.map((item, index) => ({ ...item, key: `list-key-${index}` }));
//       return (
//         <FlatList
//           data={addKeysList}
//           renderItem={personData => <Preview personData={personData} />}
//           style={leftAndRightPadding}
//         />
//       );
//     }

//     return ( // eslint-disable-line
//       <FullCard>
//         <Spinner />
//       </FullCard>
//     );
//   }
// }

// DiscoverMain.propTypes = {
//   favorites: propTypes.oneOfType([ // eslint-disable-line
//     propTypes.string,
//     propTypes.array
//   ]),
//   appDataLoading: propTypes.bool.isRequired,
//   getAppData: propTypes.func.isRequired,
//   setFavorites: propTypes.func.isRequired
// };

// export default connect(
//   state => ({
//     favorites: state.userInfo.user.favorites,
//     appDataLoading: state.userInfo.user.appDataLoading
//   }),
//   {
//     getAppData,
//     setFavorites
//     // setAppDataLoading
//   }
// )(DiscoverMain);
