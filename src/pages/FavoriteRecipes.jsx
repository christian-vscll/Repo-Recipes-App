import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

function FavoriteRecipes({ location }) {
  return (
    <div>
      <Header pathName={ location.pathname } search />
    </div>
  );
}

FavoriteRecipes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default FavoriteRecipes;
