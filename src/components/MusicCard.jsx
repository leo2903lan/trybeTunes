import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import '../styles/musicCard.css';
import Carregando from './Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

function MusicCard(props) {
  const { musicList } = props;
  const [loading, setLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const myGetFavoriteSongs = async () => {
    setLoading(true);
    const arrayFavorites = await getFavoriteSongs();
    setFavoriteSongs(arrayFavorites);
    setLoading(false);
  };

  useEffect(() => {
    myGetFavoriteSongs();
  }, []);

  const handleChange = async (e) => {
    setLoading(true);

    const [objMusic] = musicList.slice(1).filter((obj) => (
      obj.trackId === +e.target.value
    ));

    const alreadySong = favoriteSongs.find((song) => song.trackId === objMusic.trackId);

    if (!alreadySong) {
      await addSong(objMusic);
      const updatedList = await getFavoriteSongs();
      setFavoriteSongs(updatedList);
    } else {
      await removeSong(objMusic);
      const listRemov = favoriteSongs.filter((song) => song.trackId !== objMusic.trackId);
      setFavoriteSongs(listRemov);
    }

    setLoading(false);
  };

  return (
    <ul className="list-music">
      { musicList.slice(1).map((music) => (
        <li className="li-music " key={ music.trackId }>
          {/* <div className="player"> */}
          <img
            className="cd-hidden"
            src={ music.artworkUrl100 }
            alt="capa do cp redonda"
          />
          <p className="music-name">{music.trackName}</p>
          <audio
            className="audio"
            data-testid="audio-component"
            src={ music.previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          {/* </div> */}
          <label
            className="label-favorita"
            htmlFor={ music.trackId }
          >
            Favorita
            <input
              className="input-favorita"
              data-testid={ `checkbox-music-${music.trackId}` }
              type="checkbox"
              id={ music.trackId }
              value={ music.trackId }
              onChange={ handleChange }
              checked={ favoriteSongs.some((fav) => fav.trackId === music.trackId) }
            />
            <Icon className="heart" icon="ant-design:heart-twotone" />
          </label>
        </li>
      ))}
      { loading && <Carregando /> }
    </ul>
  );
}

MusicCard.propTypes = {
  musicList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
