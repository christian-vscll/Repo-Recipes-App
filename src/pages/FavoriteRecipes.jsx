import React, { useContext, useEffect } from 'react';
import FavoriteCard from '../component/FavoriteCard';
import Header from '../component/Header';
import MyContext from '../context/MyContext';

function FavoriteRecipes() {
  const {
    setFavoriteRecipes, setFilter,
  } = useContext(MyContext);

  useEffect(() => {
    const favoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoritesStorage);
    setFavoriteRecipes(favoritesStorage);
  }, [setFavoriteRecipes]);

  return (
    <div>
      <Header />
      <main>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilter('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
        <div className="all-done-Recipes">
          <FavoriteCard />
        </div>
      </main>
    </div>
  );
}

export default FavoriteRecipes;
