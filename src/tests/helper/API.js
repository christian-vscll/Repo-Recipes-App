export const fetchById = async (path) => {
  let URL;
  const sliceCaseMeals = -5;
  const sliceCaseDrinks = -6;
  if (path.includes('meals')) URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${path.slice(sliceCaseMeals)}`;
  else URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${path.slice(sliceCaseDrinks)}`;

  const response = await fetch(URL);
  const json = await response.json();
  return json;
};

export const renderIngredients = (ingredientes) => (
  ingredientes.map((elem, index) => (
    <div key={ index }>
      <span data-testid={ `${index}-ingredient-name-and-measure` }>
        {`${elem.ingredient} - ${elem.measure}`}
      </span>
      <br />
    </div>
  ))
);
