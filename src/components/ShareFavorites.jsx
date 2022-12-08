import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareFavorites({ recipe, index }) {
  const [coppied2, setCoppied2] = useState(false);
  const magicnumero = 3000;
  function greeting() {
    setCoppied2(false);
  }
  const copyMessage = () => {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCoppied2(true);
    setTimeout(greeting, magicnumero);
  };

  return (
    <div>
      <button
        className="share-bttn"
        type="button"
        onClick={ copyMessage }
      >
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {
        coppied2 && (
          <div role="alert">
            Link copied!
          </div>
        )
      }
    </div>
  );
}

ShareFavorites.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default ShareFavorites;
