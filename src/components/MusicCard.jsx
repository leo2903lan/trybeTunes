import React from 'react';
import PropTypes from 'prop-types';

function MusicCard(props) {
  const { musicList } = props;
  return (
    <ul className="list-music">
      { musicList.slice(1).map((music) => (
        <li key={ music.trackName }>
          <p>{music.trackName}</p>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </li>
      ))}
    </ul>
  );
}

MusicCard.propTypes = {
  musicList: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
