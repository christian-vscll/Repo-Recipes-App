import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

function DoneRecipes({ location, history }) {
  return (
    <div>
      <Header pathName={ location.pathname } search history={ history } />
    </div>
  );
}

DoneRecipes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default DoneRecipes;
