const verifyFavoriteRecipe = () => {
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
};

const isFavoriteRecipe = ({ id, type }) => {
  verifyFavoriteRecipe();
  let isFavorite = false;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  favoriteRecipes.forEach((recipe) => {
    // console.log('type', recipe.type === type);
    // console.log('typeRecipe', recipe.type);
    // console.log('type', type);
    // console.log('id', recipe.id.toString() === id.toString());
    if (recipe.type === type && recipe.id.toString() === id.toString()) {
      isFavorite = true;
      // console.log('isFavorite', isFavorite);
    }
  });
  return isFavorite;
};

const saveFavoriteFood = (saveRecipe) => {
  // if (localStorage.getItem('favoriteRecipes') === null) {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  // }
  verifyFavoriteRecipe();
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favoriteSave = [...favoriteRecipes, saveRecipe];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteSave));
};

const removeFavoriteFood = ({ id, type }) => {
  // if (localStorage.getItem('favoriteRecipes') === null) {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  // }
  verifyFavoriteRecipe();
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavorites = favoriteRecipes.filter((recipe) => (
    recipe.type !== type && recipe.id.toString() !== id.toString()
  ));
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};

export default {
  isFavoriteRecipe,
  saveFavoriteFood,
  removeFavoriteFood,
};
