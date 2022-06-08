import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/search.css';

function Search() {
  const [artist, setArtist] = useState('');
  const [buttonOff, setButtonOff] = useState(true);
  const [albuns, setAlbuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aparece, setAparece] = useState(false);
  const [artistName, setArtistName] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setAparece(false);
    setArtist(value);
    setArtistName(value);
    if (value.length >= 2) {
      setButtonOff(false);
    } else {
      setButtonOff(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    const coletanea = await searchAlbumsAPI(artist);
    setArtist('');
    setAparece(true);
    setAlbuns(coletanea);
    setLoading(true);
  };

  return (
    <div className="box-principal" data-testid="page-search">
      <Header />
      <main className="main">
        { loading && (
          <form onSubmit={ handleSubmit }>
            <input
              data-testid="search-artist-input"
              type="text"
              value={ artist }
              onChange={ handleChange }
              placeholder="Digite banda ou artista"
            />
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ buttonOff }
            // onClick={ buscaAlbum }
            >
              Pesquisar
            </button>
          </form>
        )}
        { aparece && (
          <span>{`Resultado de álbuns de: ${artistName}`}</span>
        ) }
        <ul>
          {albuns.map((cd) => (
            <li key={ cd.collectionId }>
              <Link
                data-testid={ `link-to-album-${cd.collectionId}` }
                to={ `/album/${cd.collectionId}` }
              >
                <img src={ cd.artworkUrl100 } alt="capa do cd" />
                {cd.collectionName}
              </Link>

            </li>
          ))}
        </ul>
        { albuns.length === 0 && <p>Nenhum álbum foi encontrado</p> }
      </main>

    </div>
  );
}

export default Search;
