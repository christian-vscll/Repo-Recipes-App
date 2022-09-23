import React from 'react';
import PropTypes from 'prop-types';
import searchIco from '../images/searchIcon.svg';
import profileIco from '../images/profileIcon.svg';

function Header({ pathName = '' }) {
  let title = '';
  let search = false;
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

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <object
        data-testid="profile-top-btn"
        type="image/svg+xml"
        data={ profileIco }
        src={ profileIco }
      >
        profile
      </object>
      {search
      && (
        <object
          data-testid="search-top-btn"
          type="image/svg+xml"
          data={ searchIco }
          src={ searchIco }
        >
          search
        </object>)}
    </div>
  );
}

Header.propTypes = {
  pathName: PropTypes.string.isRequired,
};

export default Header;
