import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, FlatList, Text } from 'react-native';
import Preview from '../sharedTabComp/Preview';
import { FullCard, Spinner } from '../../../common';

class DiscoverMain extends Component { // <------- name needs to be updated TODO
  constructor() {
    super();
  }

  render() {
    const { favorites } = this.props;;

    const addKeysList = (favorites || []).map((item, index) => {
      return {...item, key: `list-key-${index}`}
    });

    if (!favorites) return ( // eslint-disable-line
      <FullCard>
        <Spinner />
      </FullCard>
    );
    return (
      <FlatList
        data={addKeysList}
        renderItem={personData => <Preview key={personData.title} personData={personData} />} // TODO: replace key value with personData.id
      />
    );
  }
}

export default connect(
  state => ({
    favorites: state.userInfo.user.favorites
  }),
  {
  }
)(DiscoverMain);
