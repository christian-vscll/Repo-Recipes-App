import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

function DoneRecipes({ location }) {
  return (
    <div>
      <Header pathName={ location.pathname } search />
    </div>
  );
}

DoneRecipes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default DoneRecipes;
