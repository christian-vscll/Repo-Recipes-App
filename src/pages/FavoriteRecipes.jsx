import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

function FavoriteRecipes({ location, history }) {
  return (
    <div>
      <Header pathName={ location.pathname } search history={ history } />
    </div>
  );
}

FavoriteRecipes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default FavoriteRecipes;
