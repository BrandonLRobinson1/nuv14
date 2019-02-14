
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text } from 'react-native';
import propTypes from 'prop-types';
import { getAppData, setAppDataLoading } from '../../../store/userInfo/user';
import Preview from '../sharedTabComp/Preview';
import { FullCard, Spinner } from '../../../common';

class DiscoverMain extends Component {
  constructor() {
    super();

    this.state = {
      apiCallCounter: 0
    };

    this.getDiscoverData = this.getDiscoverData.bind(this);
  }

  // componentWillUnmount() {
  //   console.log('unmounted');
  //   this.setState({ apiCallCounter: 0 });
  // }

  async getDiscoverData() {
    console.log('🚗🚗🚗calling getAppData again');
    const { getAppData, setAppDataLoading } = this.props;
    setAppDataLoading(true);
    this.setState({ apiCallCounter: this.state.apiCallCounter+1 }); // eslint-disable-line
    await getAppData();
  }

  render() {
    // 🚨🚨🚨🚨🚨 dont change this code, this is written to handle all cases with getAppData() ** will ALSO only RENDER once if call makes brings back correct array
    const { favorites, appDataLoading, setAppDataLoading } = this.props;
    const { apiCallCounter } = this.state;

    if (!appDataLoading && favorites === 'empty' && apiCallCounter <= 2) {
      setTimeout(() => this.getDiscoverData(), 750);
    }

    // if firebase sends back null or something and counter is low call again
    if (!appDataLoading && !Array.isArray(favorites) && apiCallCounter <= 2) {
      setTimeout(() => this.getDiscoverData(), 750);
    }

    if (favorites === 'empty') return ( // eslint-disable-line
      <FullCard>
        <Spinner />
      </FullCard>
    );

    if (Array.isArray(favorites) && favorites.length > 1) {
      const addKeysList = favorites.map((item, index) => ({ ...item, key: `list-key-${index}` }));
      return (
        <FlatList
          data={addKeysList}
          renderItem={personData => <Preview personData={personData} />}
        />
      );
    }

    console.log('🔥🔥🔥🔥');
    return (
      <FullCard>
        <Text> oops something went wrong (send report)</Text>
      </FullCard>
    );
  }
}

DiscoverMain.propTypes = {
  favorites: propTypes.array, // eslint-disable-line
  appDataLoading: propTypes.bool.isRequired,
  getAppData: propTypes.func.isRequired,
  setAppDataLoading: propTypes.func.isRequired
};

export default connect(
  state => ({
    favorites: state.userInfo.user.favorites,
    appDataLoading: state.userInfo.user.appDataLoading
  }),
  {
    getAppData,
    setAppDataLoading
  }
)(DiscoverMain);
