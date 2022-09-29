import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIco from '../images/shareIcon.svg';

const defaultLink = 'http://localhost:3000/';

function DoneRecipeCard({ recipes, filter }) {
  const { push } = useHistory();
  const [linkCopy, setLinkCopy] = useState(false);
  let filteredRecipes;
  if (filter === 'all') {
    filteredRecipes = recipes;
  } else {
    filteredRecipes = recipes.filter((recipe) => recipe.type === filter);
  }

  return (
    <div>
      {filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id } data-testid="recipeList">
          <button
            style={ { backgroundColor: '#00000000', borderColor: '#00000000' } }
            type="button"
            onClick={ () => push(`/${recipe.type}s/${recipe.id}`) }
          >
            <img
              width="100px"
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <h6 data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </h6>
            <h5 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h5>
          </button>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.type === 'meal'
            ? (recipe.tags.map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </p>
            )))
            : (<div>{ recipe.alcoholicOrNot }</div>)}
          <button
            type="button"
            onClick={ () => {
              copy(`${defaultLink}${recipe.type}s/${recipe.id}`)
                .then(() => setLinkCopy(true));
            } }
          >
            <img
              src={ shareIco }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
            {linkCopy && (<p>Link copied!</p>)}
          </button>
        </div>
      ))}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    doneDate: PropTypes.string,
  })).isRequired,
  filter: PropTypes.string.isRequired,
};

export default DoneRecipeCard;
