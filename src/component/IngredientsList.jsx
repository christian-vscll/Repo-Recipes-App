import React from 'react';
import PropTypes from 'prop-types';

function IngredientList({ ingredients }) {
  console.log(ingredients);
  const keys = Object.keys(ingredients).filter((key) => key !== 'null');
  return (
    <ul>
      {keys.map((key) => (
        <li key={ key }>
          <span>{ key }</span>
          <span>:  </span>
          <span>{ingredients[key]}</span>
        </li>
      ))}
    </ul>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.shape({}).isRequired,
};

export default IngredientList;
