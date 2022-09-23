import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIco from '../images/searchIcon.svg';
import profileIco from '../images/profileIcon.svg';

function Header({ pathName, history }) {
  const [searchVisible, setSearchVisible] = useState(false);
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

Header.defaultProps = {
  history: {
    push: () => {},
  },
  pathName: '',
};

Header.propTypes = {
  pathName: PropTypes.string,
  history: PropTypes.shape({ push: PropTypes.func }),
};

export default Header;
