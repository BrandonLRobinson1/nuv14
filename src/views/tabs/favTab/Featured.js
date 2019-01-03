import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import FeaturedItem from './FeaturedItem';
import { FullCard, Spinner } from '../../../common';
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
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 // eslint-disable-line
    });

    // basically if a value is passed to this prop under dataToRender ... render that (favorites or history) otherwise render the standard featured (which is currently sharing favorites) TODO wire up correctly
    const renderData = Array.isArray(this.props.dataToRender) ? this.props.dataToRender : this.props.favorites;
    this.dataSource = ds.cloneWithRows(renderData); // **  data pulled from sample json!! WILL PULL FROM REDUX ON APP MOUNT => this.props.markerData
  }

  render() {
    if (this.props.favorites && !this.state.noDoubleRender) {
      this.setState({ noDoubleRender: true });
      this.getRows();
    }
    if (!this.dataSource) return ( // eslint-disable-line
      <FullCard>
        <Spinner />
      </FullCard>
    );
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={personData => <FeaturedItem key={personData.title} personData={personData} />} // TODO: replace key value with personData.id
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
