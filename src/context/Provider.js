import React, { useState } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [recipeDetail, setRecipeDetail] = useState();
  const [recomendations, setRecomendations] = useState();
  const [copied, setCopied] = useState();
  const [favoriteRecipes, setFavoriteRecipes] = useState();
  const [filter, setFilter] = useState('all');

  const contextValue = {
    recipeDetail,
    setRecipeDetail,
    recomendations,
    setRecomendations,
    copied,
    setCopied,
    favoriteRecipes,
    setFavoriteRecipes,
    filter,
    setFilter,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.defaultProps = { children: {} };
Provider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.array,
    propTypes.object,
  ]),
};

export default Provider;
