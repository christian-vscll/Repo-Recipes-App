import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function RecipeCard() {
  const history = useHistory();
  const isMeals = history.location.pathname === '/meals';

  const [originalMeals, setOriginalMeals] = useState([]);
  const [originalDrinks, setOriginalDrinks] = useState([]);
  const [originalMealsCategories, setOriginalMealsCategories] = useState([]);
  const [originalDrinksCategories, setOriginalDrinksCategories] = useState([]);

  const getMeals = async () => {
    const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const dataMeals = await responseMeals.json();
    const { meals } = dataMeals;
    setOriginalMeals(meals);
    const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const dataDrinks = await responseDrinks.json();
    const { drinks } = dataDrinks;
    setOriginalDrinks(drinks);
  };

  const getMealsCategories = async () => {
    const responseMealsCategories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const dataMealsCategories = await responseMealsCategories.json();
    const { meals } = dataMealsCategories;
    setOriginalMealsCategories(meals);
    const responseDrinksCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const dataDrinksCategories = await responseDrinksCategories.json();
    const { drinks } = dataDrinksCategories;
    setOriginalDrinksCategories(drinks);
  };

  useEffect(() => {
    getMeals();
    getMealsCategories();
  }, []);
  const NUMBER_OF_ITEMS_NEEDED = 12;
  const NUMBER_OF_CATEGORIES_NEEDED = 5;
  const splitFoodData = originalMeals.slice(0, NUMBER_OF_ITEMS_NEEDED);
  const splitFoodCategoriesData = originalMealsCategories
    .slice(0, NUMBER_OF_CATEGORIES_NEEDED);
  // console.log('Food Data');
  // console.log(splitFoodData);
  // console.log(splitFoodCategoriesData);

  const splitDrinkData = originalDrinks.slice(0, NUMBER_OF_ITEMS_NEEDED);
  const splitDrinksCategoriesData = originalDrinksCategories
    .slice(0, NUMBER_OF_CATEGORIES_NEEDED);
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

  const handleFoodsCatButtons = (category) => {
    const categoryFixed = category.split(' ').join('_');
    console.log(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryFixed}`);
  };

  const handleDrinksCatButtons = (category) => {
    const categoryFixed = category.split(' ').join('_');
    console.log(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryFixed}`);
  };

  // função que vai criar os botões de categoria dinamicamente
  const categorieButtonCreator = (categories) => (
    categories.map(({ strCategory }, index) => (
      <button
        data-testid={ `${strCategory}-category-filter` }
        key={ index }
        type="button"
        className="recipe-card-buttons"
        onClick={ isMeals
          ? () => handleFoodsCatButtons(strCategory)
          : () => handleDrinksCatButtons(strCategory) }
      >
        { strCategory }
      </button>
    ))
  );

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
