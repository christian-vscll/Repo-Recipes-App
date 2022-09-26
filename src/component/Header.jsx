import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchIco from '../images/searchIcon.svg';
import profileIco from '../images/profileIcon.svg';

function Header() {
  const [searchVisible, setSearchVisible] = useState(false);
  const history = useHistory();
  const { location: { pathname: pathName } } = history;
  let title = '';
  let search = false;

  const setTitleAndSearch = () => {
    switch (pathName) {
    case '/meals':
      title = 'Meals';
      search = true;
      break;
    case '/drinks':
      title = 'Drinks';
      search = true;
      break;
    case '/profile':
      title = 'Profile';
      break;
    case '/done-recipes':
      title = 'Done Recipes';
      break;
    case '/favorite-recipes':
      title = 'Favorite Recipes';
      break;
    default:
      break;
    }
  };
  setTitleAndSearch();

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIco } alt="profile" data-testid="profile-top-btn" />
      </button>
      {search
      && (
        <button
          type="button"
          onClick={ () => setSearchVisible(!searchVisible) }
        >
          <img src={ searchIco } alt="profile" data-testid="search-top-btn" />
        </button>)}
      {searchVisible
      && (
        <p data-testid="search-input">
          barra de busca
        </p>)}
    </div>
  );
}

export default Header;
