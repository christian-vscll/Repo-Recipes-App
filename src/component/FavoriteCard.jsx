import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';

const copy = require('clipboard-copy');

function FavoriteCard() {
  const {
    favoriteRecipes, filter, copied, setCopied,
  } = useContext(MyContext);

  // const history = useHistory();

  let filteredRecipes;
  if (filter === 'all') filteredRecipes = favoriteRecipes;
  else {
    filteredRecipes = favoriteRecipes.filter((recipe) => recipe.type === filter);
  }

  return (
    <div>
      {
        filteredRecipes !== undefined && (
          filteredRecipes.map((recipe, index) => {
            if (recipe.type === 'meal') {
              return (
                <div className="favoriteRecipe-div" key={ index }>
                  <img
                    className="img-favorite-card"
                    src={ recipe.image }
                    alt={ recipe.image }
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
                  <h4 data-testid={ `${index}-horizontal-top-text` }>
                    { `${recipe.nationality} - ${recipe.category}` }
                  </h4>
                  <h4>{ recipe.nationality }</h4>
                  <button
                    className="favoriteRecipe-share"
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    onClick={ () => {
                      copy(`http://localhost:3000/meals/${recipe.id}`);
                      setCopied(true);
                      // window.scrollTo(0, document.body.scrollHeight);
                    } }
                  >
                    <img src={ shareIcon } alt="share" />
                  </button>
                  <button
                    className="favoriteRecipe-unlike"
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                  >
                    <img src={ blackHeartIcon } alt="unlike" />
                  </button>
                  {copied && (<h1>Link copied!</h1>)}
                </div>
              );
            }
            return (
              <div className="favoriteRecipe-div" key={ index }>
                <img
                  className="img-favorite-card"
                  src={ recipe.image }
                  alt={ recipe.image }
                  data-testid={ `${index}-horizontal-image` }
                />
                <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
                <h4 data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.alcoholicOrNot }
                </h4>
                <button
                  className="favoriteRecipe-share"
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => {
                    copy(`http://localhost:3000/drinks/${recipe.id}`);
                    setCopied(true);
                    // window.scrollTo(0, document.body.scrollHeight);
                  } }
                >
                  <img src={ shareIcon } alt="share" />
                </button>
                <button
                  className="favoriteRecipe-unlike"
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                >
                  <img src={ blackHeartIcon } alt="unlike" />
                </button>
                {copied && (<h1>Link copied!</h1>)}
              </div>
            );
          })
        )
      }
      {/* {
        copied !== undefined && (
          <div className="copied-div">
            <h3>Link copied!</h3>
          </div>
        )
      } */}
    </div>
  );
}

export default FavoriteCard;
