import React, { useState } from 'react';
import DoneRecipeCard from '../component/DoneRecipeCard';
import Header from '../component/Header';
import doneRecipesLocalStorage from '../services/doneRecipesLocalStorage';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const DoneRecipesList = doneRecipesLocalStorage.getAllDoneRecipe();
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
          <DoneRecipeCard recipes={ DoneRecipesList } filter={ filter } />
        </div>
      </main>
    </div>
  );
}

export default DoneRecipes;
