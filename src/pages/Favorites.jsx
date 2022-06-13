import React, { useEffect, useState } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/favorites.css';

function Favorites() {
  const [loading, setLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const myGetFavoriteSongs = async () => {
    const arrayFavorites = await getFavoriteSongs();
    setFavoriteSongs(arrayFavorites);
  };

  useEffect(() => {
    setLoading(true);
    myGetFavoriteSongs();
    setLoading(false);
  }, [favoriteSongs]);

  return (
    <div data-testid="page-favorites">
      <Header />
      { loading && <Carregando /> }
      <MusicCard musicList={ favoriteSongs } />
    </div>
  );
}

export default Favorites;
