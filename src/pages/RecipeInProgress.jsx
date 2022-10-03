import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
// import Header from '../component/Header';
import IngredientList from '../component/IngredientsList';
import drinksIdRequest from '../services/drinksFetch';
import mealsIdRequest from '../services/mealsFetch';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import favoriteRecipesLocalStorage from '../services/favoriteRecipesLocalStorage';
import doneRecipesLocalStorage from '../services/doneRecipesLocalStorage';

function RecipeInProgress() {
  const { id: recipeId } = useParams();
  const { location: { pathname }, push } = useHistory();
  const [urlImg, setUrlImg] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [Ingredient, setIngredient] = useState({});
  const [instructions, setInstructions] = useState('');
  const [shareButton, setShareButton] = useState('Share');
  const [isfavorite, setIsFavorite] = useState(false);
  const [nationality, setNationality] = useState('');
  const [alcoholicOrNot, setAlcoholicOrNot] = useState('');
  const [tags, setTags] = useState('');
  const [isFinishButton, setIsFinishButton] = useState(false);

  // useEffect(() => {
  //   if (shareButton !== 'Share') {
  //     const twoSeconds = 2000;
  //     setTimeout(() => setShareButton('Share'), twoSeconds);
  //   }
  // }, [shareButton]);

  useEffect(() => {
    const fetchDrinkWithId = async () => {
      // const drink = await drinksIdRequest('13899' || recipeId);
      const drink = await drinksIdRequest(recipeId);
      // console.log(drink);
      setUrlImg(drink.strDrinkThumb);
      setCategory(drink.strCategory);
      setName(drink.strDrink);
      setNationality(drink.strArea || '');
      setAlcoholicOrNot(drink.strAlcoholic);
      setInstructions(drink.strInstructions);
      setTags(drink.strTags);
      const ingredientesKeys = Object.keys(drink)
        .filter((value) => value.includes('strIngredient'));
      const ingredientesObj = {};
      ingredientesKeys.forEach((key, index) => {
        ingredientesObj[drink[key]] = drink[`strMeasure${index + 1}`];
      });
      setIngredient(ingredientesObj);
    };
    const fetchMealsWithId = async () => {
      const meals = await mealsIdRequest(recipeId);
      // const meals = { ...mealsMock };
      // console.log(meals);
      setUrlImg(meals.strMealThumb);
      setCategory(meals.strCategory);
      setName(meals.strMeal);
      setNationality(meals.strArea);
      setInstructions(meals.strInstructions);
      setTags(meals.strTags);
      const ingredientesKeys = Object.keys(meals)
        .filter((value) => value.includes('strIngredient'));
      const ingredientesObj = {};
      ingredientesKeys.forEach((key, index) => {
        ingredientesObj[meals[key]] = meals[`strMeasure${index + 1}`];
      });
      setIngredient(ingredientesObj);
    };

    if (pathname.includes('/drink')) {
      fetchDrinkWithId();
    } else {
      fetchMealsWithId();
    }

    const isFav = favoriteRecipesLocalStorage.isFavoriteRecipe({
      id: recipeId,
      type: pathname.split('/')[1] === 'meals' ? 'meal' : 'drink',
    });
    setIsFavorite(isFav);
  }, [recipeId, pathname]);

  const shareLink = () => {
    const linkCopyArray = pathname.split('/');
    const linkCopy = `http://localhost:3000/${linkCopyArray[1]}/${recipeId}`;
    copy(linkCopy).then(() => setShareButton('Link copied!'));
  };

  const clickFavorite = () => {
    const favoriteRecipe = {
      id: recipeId,
      type: pathname.split('/')[1] === 'meals' ? 'meal' : 'drink',
      nationality,
      category,
      alcoholicOrNot,
      name,
      image: urlImg,
    };
    if (isfavorite) {
      setIsFavorite(false);
      favoriteRecipesLocalStorage.removeFavoriteFood(favoriteRecipe);
    } else {
      setIsFavorite(true);
      favoriteRecipesLocalStorage.saveFavoriteFood(favoriteRecipe);
    }
  };

  const activeFinishButton = (boolean) => {
    setIsFinishButton(boolean);
  };
  // console.log('IsFinishButton', isFinishButton);

  const finishButtonfn = () => {
    const recipe = {
      id: recipeId,
      type: pathname.split('/')[1] === 'meals' ? 'meal' : 'drink',
      nationality,
      category,
      alcoholicOrNot,
      name,
      image: urlImg,
      tags: (tags !== null ? tags.split(',') : []),
      doneDate: new Date().toLocaleDateString(),
    };
    doneRecipesLocalStorage.addDoneRecipe(recipe);
    push('/done-recipes');
  };

  return (
    <div>
      <div className="receita">
        <img
          src={ urlImg }
          alt="recipe"
          data-testid="recipe-photo"
          width="200px"
        />
        <h3 data-testid="recipe-title">{ name || 'sem titulo'}</h3>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ shareLink }
        >
          {shareButton}
        </button>
        <button type="button" onClick={ clickFavorite }>
          <img
            src={ isfavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite"
            data-testid="favorite-btn"
          />
        </button>
        <p data-testid="recipe-category">{category}</p>
        <div data-testid="instructions">
          {instructions}
        </div>
        <IngredientList
          ingredients={ Ingredient }
          activeFinishButton={ activeFinishButton }
        />
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !isFinishButton }
          onClick={ finishButtonfn }
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
