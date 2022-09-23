import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

function Recipes({ location }) {
  return (
    <div>
      <Header pathName={ location.pathname } search />
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default Recipes;
