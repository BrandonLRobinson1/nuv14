import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import FavoriteItem from './FavoriteItem';
import { FullCard, Spinner } from '../../../common';
import data from '../../../store/dummyMembers.json';
// import { updateFirstName, updateLastName, updateZipCode } from '../../store/userInfo.user';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      noDoubleRender: false
    };

    this.getRows = this.getRows.bind(this);
  }
  getRows() {
  // will AUTOMATICALLY pull info from redux, sfetched as app loads
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 // eslint-disable-line
    });
    this.dataSource = ds.cloneWithRows(data); // **  data pulled from sample json!! WILL PULL FROM REDUX ON APP MOUNT => this.props.markerData
    // this.dataSource = ds.cloneWithRows(this.props.favorites); // **  data pulled from sample json!! WILL PULL FROM REDUX ON APP MOUNT => this.props.markerData
  }

  render() {
    console.log('FLAVOR FAAAVS', this.props.favorites)
    if (this.props.favorites && !this.state.noDoubleRender) {
      this.setState({ noDoubleRender: true });
      this.getRows();
    }
    if (!this.dataSource /* !this.props.markerData */) return ( // eslint-disable-line
      <FullCard>
        <Spinner />
      </FullCard>
    );
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={personData => <FavoriteItem key={Math.random()} personData={personData} />} // TODO: replace Math.random with personData.id
      />
    );
  }
}

export default connect(
  state => ({
    favorites: state.userInfo.user.favorites
  }),
  {
    // updateFirstName,
  }
)(Favorites);
