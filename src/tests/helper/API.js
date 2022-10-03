export const fetchById = async (path) => {
  let URL;
  let id = '';
  let tramontina = false;
  for (let index = 5; index < path.length; index += 1) {
    if (tramontina === true) id += path[index];
    if (path[index] === '/') tramontina = true;
  }
  if (path.includes('meals')) URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  else URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

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
