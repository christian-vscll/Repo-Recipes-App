import React from 'react';
import { useHistory } from 'react-router-dom';
import { meals, mealsCategories } from '../helpers/mockFoodsData';
import { drinks, drinkCategories } from '../helpers/mockDrinksData';

function RecipeCard() {
  const history = useHistory();

  const NUMBER_OF_ITEMS_NEEDED = 12;
  const NUMBER_OF_CATEGORIES_NEEDED = 5;
  const splitFoodData = meals.slice(0, NUMBER_OF_ITEMS_NEEDED);
  const splitFoodCategoriesData = mealsCategories.slice(0, NUMBER_OF_CATEGORIES_NEEDED);
  // console.log('Food Data');
  // console.log(splitFoodData);
  // console.log(splitFoodCategoriesData);

  const splitDrinkData = drinks.slice(0, NUMBER_OF_ITEMS_NEEDED);
  const splitDrinksCategoriesData = drinkCategories.slice(0, NUMBER_OF_CATEGORIES_NEEDED);
  // console.log('Drink Data');
  // console.log(splitDrinkData);
  // console.log(splitDrinksCategoriesData);

  const foodCardsCreator = (data) => (
    data.map(({
      idMeal,
      strMeal,
      strMealThumb,
    }, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
        <h3 data-testid={ `${index}-card-name` }>{ strMeal }</h3>
        <img
          data-testid={ `${index}-card-img` }
          className="recipe-card-img"
          src={ strMealThumb }
          alt={ `${strMeal}` }
        />
      </div>
    ))
  );

  const drinkCardsCreator = (data) => (
    data.map(({
      idDrink,
      strDrink,
      strDrinkThumb,
    }, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
        <h3 data-testid={ `${index}-card-name` }>{ strDrink }</h3>
        <img
          data-testid={ `${index}-card-img` }
          className="recipe-card-img"
          src={ strDrinkThumb }
          alt={ `${strDrink}` }
        />
      </div>
    ))
  );

  // função que vai criar os botões de categoria dinamicamente
  const categorieButtonCreator = (categories) => (
    categories.map(({ strCategory }, index) => (
      <button
        data-testid={ `${strCategory}-category-filter` }
        key={ index }
        type="button"
      >
        { strCategory }
      </button>
    ))
  );

  const isMeals = history.location.pathname === '/meals';

  return (
    <div className="recipe-card-div">
      <h1>RECIPE CARDS</h1>
      { isMeals ? foodCardsCreator(splitFoodData) : drinkCardsCreator(splitDrinkData) }
      { isMeals
        ? categorieButtonCreator(splitFoodCategoriesData)
        : categorieButtonCreator(splitDrinksCategoriesData) }
    </div>
  );
}

export default RecipeCard;
