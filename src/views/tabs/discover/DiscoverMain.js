import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text } from 'react-native';
import propTypes from 'prop-types';
import { getAppData, setAppDataLoading } from '../../../store/userInfo/user';
import Preview from '../sharedTabComp/Preview';
import { FullCard, Spinner } from '../../../common';

// eslint-disable-next-line
class DiscoverMain extends Component {
  constructor() {
    super();

    this.state = {
      apiCallCounter: 0
    };

    this.getDiscoverData = this.getDiscoverData.bind(this);
  }

  // componentDidMount() {
  //   return this.getDiscoverData();
  // }

  getDiscoverData() {
    console.log('🚗🚗🚗calling getAppData again');
    const { getAppData, setAppDataLoading } = this.props;
    setAppDataLoading(true);
    this.setState({ apiCallCounter: this.state.apiCallCounter+1 }); // eslint-disable-line
    getAppData();
  }

  render() {
    const { favorites, appDataLoading, setAppDataLoading } = this.props;
    let { apiCallCounter } = this.state;

    if (!appDataLoading && favorites === 'empty' && apiCallCounter <= 2) {
      this.getDiscoverData();
    }

    if (!Array.isArray(favorites)) return ( // eslint-disable-line
      <FullCard>
        <Spinner />
      </FullCard>
    );

    if (!appDataLoading && !favorites && apiCallCounter >= 3) return ( // eslint-disable-line
    // if (!appDataLoading && !Array.isArray(favorites) && apiCallCounter >= 3) return ( // eslint-disable-line
      <FullCard>
        <Text> no service</Text>
      </FullCard>
    );

    const addKeysList = ([]).map((item, index) => ({ ...item, key: `list-key-${index}`}) );
    // const addKeysList = (favorites || []).map((item, index) => ({ ...item, key: `list-key-${index}`}) );

    return (
      <FlatList
        data={addKeysList}
        renderItem={personData => <Preview personData={personData} />}
      />
    );
  }
}

DiscoverMain.propTypes = {
  // favorites: propTypes.array, // eslint-disable-line
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
