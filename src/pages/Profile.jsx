import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

function Profile({ location }) {
  return (
    <div>
      <Header pathName={ location.pathname } search />
    </div>
  );
}

Profile.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default Profile;
