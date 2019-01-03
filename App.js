import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { config } from './private';
import Router from './Router';
import { store } from './src/store';


export default class App extends Component {
  componentWillMount() {
    // TODO: right here load their recent, their favorites, and settings into redux
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

// to quickly insert and test databases 

// import React, { Component } from 'react';
// import { Provider } from 'react-redux';
// import firebase from 'firebase';
// import { config } from './private';
// import Router from './Router';
// import { store } from './src/store';


// export default class App extends Component {
//   componentWillMount() {
//     // TODO: right here load their recent, their favorites, and settings into redux
//     firebase.initializeApp(config);


//     firebase.database().ref(`/business/testAccounts/${111222333}`) // TODO ***** WILL HAVE SUBFOLDER LIKE USER INFO, LIKES ETC
//     .push({
//       "salon": "salon x",
//       "email": "salonx@xsolon.net",
//       "services": ["manicure", "pedicure", "shit"],
//       "phone": 7044445555,
//       "area": "atlanta",
//       "coordinate": {
//         "latitude": 45.524548,
//         "longitude": -122.6749817
//       },
//       "availNow": true,
//       "image": {
//         "uri": "https://i.imgur.com/N7rlQYt.jpg"
//       },
//       "reviews": [
//         {
//           "user": "longkey",
//           "userName": "longkey kenny",
//           "rating": 4,
//           "comment": "she was aiiiight"
//         },
//         {
//           "user": "longkey",
//           "userName": "longkey kiera",
//           "rating": 3,
//           "comment": "she was shitty"
//         }
//       ],
//       "payments": {},
//       "status": null
//     });
//   }

//   render() {
//     return (
//       <Provider store={store}>
//         <Router />
//       </Provider>
//     );
//   }
// }

// import React, { Component } from 'react';
// import { Provider } from 'react-redux';
// import firebase from 'firebase';
// import { config } from './private';
// import Router from './Router';
// import { store } from './src/store';


// export default class App extends Component {
//   componentWillMount() {
//     // TODO: right here load their recent, their favorites, and settings into redux
//     firebase.initializeApp(config);


//     firebase.database().ref(`/city/atlanta/testAccounts/${111222333}`) // TODO ***** WILL HAVE SUBFOLDER LIKE USER INFO, LIKES ETC
//     .push([
//       {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Pierre Nails",
//           "description": "This is the best place in Portland, we specialize in this and that and this. Loctated in upper east, it is a luxury to treat you.",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },


//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 2",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 3",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 4",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 5",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 6",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 1",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 2",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 3",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 4",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 5",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 6",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 1",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 2",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 3",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 4",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 5",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         },
//         {
//           "id": "xxxxxx",
//           "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//           "coordinate": {
//             "latitude": 45.524548,
//             "longitude": -122.6749817
//           },
//           "title": "Best 6",
//           "description": "This is the best place in Portland",
//           "name": "Shizzle Jacklyn",
//           "address": {
//             "street": "8649 A C Skinner Parkway",
//             "details": "App 922",
//             "city": "Jacksonville",
//             "state": "FL",
//             "zip": "33256"
//           },
//           "phone": "708-897-2343",
//           "servicesOffered": ["stuff", "stuffy"],
//           "ratings": [
//             {
//               "id": "xxxxxx",
//               "image": { uri: "https://i.imgur.com/K3KJ3w4h.jpg" },
//               "name": "angry Joe",
//               "comment": "blah",
//               "time": "timestamp",
//               "rating": "2"
//             }
//           ],
//           "qr": {
//             "qrStuff": {}
//           },
//           "customers": [
//             {
//               "id": "",
//               "order": "",
//               "price": "",
//               "time":"",
//               "distance": "how far were you willing to go"
//             }
//           ],
//           "availabily": "",
//           "avaialbleNow": false,
//           "appointments": "idk what to do for this yet"
//         }
//     ]);
//   }

//   render() {
//     return (
//       <Provider store={store}>
//         <Router />
//       </Provider>
//     );
//   }
// }