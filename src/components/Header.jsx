import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import searchIconSVG from '../images/searchIcon.svg';
import profileIconSVG from '../images/profileIcon.svg';

export default function Header() {
  const [activeSearch, setActiveSearch] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [searchIcon, setSearchIcon] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
    case '/meals':
      setPageTitle('Meals');
      setSearchIcon(true);
      break;
    case '/drinks':
      setPageTitle('Drinks');
      setSearchIcon(true);
      break;
    case '/profile':
      setPageTitle('Profile');
      break;
    case '/done-recipes':
      setPageTitle('Done Recipes');
      break;
    case '/favorite-recipes':
      setPageTitle('Favorite Recipes');
      break;
    default:
      break;
    }
  }, [pathname]);

  function setSearch() {
    if (activeSearch) {
      setActiveSearch(false);
    } else {
      setActiveSearch(true);
    }
  }
  //
  return (
    <>
      <p data-testid="page-title">{ pageTitle }</p>
      {
        searchIcon && (
          <button type="button" data-testid="search-top-btn" onClick={ setSearch }>
            <img src={ searchIconSVG } alt="Search" />
          </button>
        )
      }
      <Link to="/profile">
        <button type="button" data-testid="profile-top-btn">
          <img src={ profileIconSVG } alt="Profile" />
        </button>
      </Link>
      { activeSearch
      && <input type="text" data-testid="search-input" /> }
    </>
  );
}
