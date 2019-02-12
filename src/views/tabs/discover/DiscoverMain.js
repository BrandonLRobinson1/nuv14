import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import propTypes from 'prop-types';
import { getAppData } from '../../../store/userInfo/user';
import Preview from '../sharedTabComp/Preview';
import { FullCard, Spinner } from '../../../common';

// eslint-disable-next-line
class DiscoverMain extends Component {
  constructor() {
    super();

    this.state = {
      apiCallCounter: 0
    };
  }


  render() {
    const { favorites, appDataLoading, getAppData } = this.props;
    const { apiCallCounter } = this.state;
    const addKeysList = (favorites || []).map((item, index) => ({ ...item, key: `list-key-${index}`}) );

    console.log('appDataLoading before', appDataLoading)
    console.log('👨‍🔬 !appDataLoading && !favorites && apiCallCounter <= 3', appDataLoading, favorites, apiCallCounter)
    if (!appDataLoading && !favorites && apiCallCounter <= 3) {
      console.log('appDataLoading after', appDataLoading)
      console.log('🚗🚗🚗calling getAppData again');
      this.setState({ apiCallCounter: this.state.apiCallCounter++ }); // eslint-disable-line
      getAppData();
    }

    if (!favorites || !favorites.length) return ( // eslint-disable-line
      <FullCard>
        <Spinner />
      </FullCard>
    );
    return (
      <FlatList
        data={addKeysList}
        renderItem={personData => <Preview personData={personData} />}
      />
    );
  }
}

DiscoverMain.propTypes = {
  favorites: propTypes.array, // eslint-disable-line
  appDataLoading: propTypes.bool.isRequired,
  getAppData: propTypes.func.isRequired
};

export default connect(
  state => ({
    favorites: state.userInfo.user.favorites,
    appDataLoading: state.userInfo.user.appDataLoading
  }),
  {
    getAppData
  }
)(DiscoverMain);
