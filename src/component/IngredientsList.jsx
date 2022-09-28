import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import recipeInProgressServices from '../services/recipeInProgressLocalStorage';

function IngredientList({ ingredients, activeFinishButton }) {
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

  useEffect(() => {
    // console.log('keys', keys.length);
    // console.log('ing', Object.keys(ingredientChecked).length);
    if (keys.length === Object.keys(ingredientChecked).length
    && Object.keys(ingredientChecked).length > 0) {
      // console.log('igual');
      let isAllChecked = true;
      Object.keys(ingredientChecked).forEach((ing) => {
        if (ingredientChecked[ing] === false) {
          isAllChecked = false;
        }
      });
      activeFinishButton(isAllChecked);
    }
  });

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
  activeFinishButton: PropTypes.func.isRequired,
};

export default IngredientList;
