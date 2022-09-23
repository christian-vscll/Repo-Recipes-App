import React from 'react';
import PropTypes from 'prop-types';
import searchIco from '../images/searchIcon.svg';
import profileIco from '../images/profileIcon.svg';

function Header({ title = 'titulo', search = false }) {
  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        <object
          type="image/svg+xml"
          data={ profileIco }
        >
          profile
        </object>
      </button>
      {search
      && (
        <button
          type="button"
          data-testid="search-top-btn"
        >
          <object
            type="image/svg+xml"
            data={ searchIco }
          >
            search
          </object>
        </button>)}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
