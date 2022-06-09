import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import '../styles/musicCard.css';
import Carregando from './Carregando';
import { addSong } from '../services/favoriteSongsAPI';

function MusicCard(props) {
  const { musicList } = props;
  const [saveFavorite, setSaveFavorite] = useState(false);

  const handleChange = async (e) => {
    setSaveFavorite(true);
    const [objMusic] = musicList.slice(1).filter((obj) => (
      obj.trackId === +e.target.value
    ));
    await addSong(objMusic);
    setSaveFavorite(false);
  };

  return (
    <ul className="list-music">
      { saveFavorite && <Carregando /> }
      { musicList.slice(1).map((music) => (
        <li className="li-music " key={ music.trackName }>
          {/* <div className="player"> */}
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
            Favoritas
            <input
              className="input-favorita"
              data-testid={ `checkbox-music-${music.trackId}` }
              type="checkbox"
              id={ music.trackId }
              value={ music.trackId }
              onChange={ handleChange }
            />
            <Icon className="heart" icon="ant-design:heart-twotone" />
          </label>
        </li>
      ))}
    </ul>
  );
}

MusicCard.propTypes = {
  musicList: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
