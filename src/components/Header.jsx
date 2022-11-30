import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const [activeSearch, setActiveSearch] = useState(false);

  function setSearch() {
    if (activeSearch) {
      setActiveSearch(false);
    } else {
      setActiveSearch(true);
    }
  }

  return (
    <>
      <p data-testid="page-title">Nome da página passado por props</p>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src="" alt="Profile" />
      </Link>
      <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
      { activeSearch
      && <input type="text" data-testid="search-input" onClick={ setSearch } /> }
    </>
  );
}
