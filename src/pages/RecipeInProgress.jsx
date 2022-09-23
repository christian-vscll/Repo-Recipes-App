import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

function RecipeInProgress({ history }) {
  return (
    <div>
      <Header history={ history } />
    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default RecipeInProgress;
