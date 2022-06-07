import React, { useState } from 'react';
import Header from '../components/Header';

function Search() {
  const [artist, setArtist] = useState('');
  const [buttonOff, setButtonOff] = useState(true);

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setArtist(value);
    if (value.length >= 2) {
      setButtonOff(false);
    } else {
      setButtonOff(true);
    }
  };

  return (
    <div data-testid="page-search">
      <Header />
      <form>
        <input
          data-testid="search-artist-input"
          type="text"
          value={ artist }
          onChange={ handleChange }
          placeholder="Digite banda ou artista"
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonOff }
        >
          Pesquisar
        </button>
      </form>
    </div>
  );
}

export default Search;
