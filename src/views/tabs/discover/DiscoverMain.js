import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import propTypes from 'prop-types';
import Preview from '../sharedTabComp/Preview';
import { FullCard, Spinner } from '../../../common';

// eslint-disable-next-line
class DiscoverMain extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    const { favorites } = this.props;
    const addKeysList = (favorites || []).map((item, index) => ({ ...item, key: `list-key-${index}`}) );

    if (!favorites.length) return ( // eslint-disable-line
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
  favorites: propTypes.array // eslint-disable-line
};

export default connect(
  state => ({
    favorites: state.userInfo.user.favorites
  }),
  {
  }
)(DiscoverMain);
