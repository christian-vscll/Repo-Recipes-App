import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

function Recipes({ location, history }) {
  return (
    <div>
      <Header
        history={ history }
        pathName={ location.pathname }
        search
      />
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Recipes;
