import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import recipeInProgressServices from '../services/recipeInProgressLocalStorage';

function IngredientList({ ingredients }) {
  const { id: recipeId } = useParams();
  const [ingredientChecked, setIngredientChecked] = useState(
    recipeInProgressServices.getStatus(recipeId),
  );
  const ingredientsList = { ...ingredients };
  delete ingredientsList.null;
  delete ingredientsList[''];
  const keys = Object.keys(ingredientsList);
  const clickCheckbox = ({ target, key }) => {
    if (target.checked) {
      recipeInProgressServices.saveStatusTrue(recipeId, key);
    } else {
      recipeInProgressServices.saveStatusFalse(recipeId, key);
    }
    setIngredientChecked(recipeInProgressServices.getStatus(recipeId));
  };
  // console.log(ingredientChecked);
  return (
    <ul>
      {keys.map((key, index) => (
        <li key={ key } data-testid={ `${index}-ingredient-step` }>
          <label htmlFor={ key }>
            <span>{ key }</span>
            <span>:  </span>
            <span>{ingredients[key]}</span>
            <input
              id={ key }
              type="checkbox"
              onClick={ ({ target }) => clickCheckbox({ target, key }) }
              checked={ ingredientChecked === undefined
                ? false
                : ingredientChecked[key] }
            />
          </label>
        </li>
      ))}
    </ul>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.shape({}).isRequired,
};

export default IngredientList;
