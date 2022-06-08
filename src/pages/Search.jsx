import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
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
          <form className="search-form-box" onSubmit={ handleSubmit }>
            <div className="search-input-box">
              <input
                className="search-artist-input"
                data-testid="search-artist-input"
                type="text"
                value={ artist }
                onChange={ handleChange }
                placeholder="Digite banda ou artista"
              />
              <Icon icon="fa:search" />
            </div>
            <button
              className="search-artist-button"
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
          <span className="artist-result">{`Resultado de álbuns de: ${artistName}`}</span>
        ) }
        <ul className="artist-box">
          {albuns.map((cd) => (
            <li className="album-box" key={ cd.collectionId }>
              <Link
                className="album-box-link "
                data-testid={ `link-to-album-${cd.collectionId}` }
                to={ `/album/${cd.collectionId}` }
              >
                <img className="img-box" src={ cd.artworkUrl100 } alt="capa do cd" />
                <p className="cd-collection">{cd.collectionName}</p>
                <p className="artist-name">{cd.artistName}</p>
              </Link>

            </li>
          ))}
        </ul>
        { albuns.length === 0
          && <p className="not-album">Nenhum álbum foi encontrado</p> }
      </main>

    </div>
  );
}

export default Search;
