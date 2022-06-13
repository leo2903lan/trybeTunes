import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusic from '../services/musicsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import '../styles/album.css';

function Album(props) {
  const { match: { params: { id } } } = props;
  const [musicList, setMusicList] = useState([]);

  const myGetmusicFetch = async () => {
    const myListMusic = await getMusic(id);
    setMusicList(myListMusic);
  };

  useEffect(() => {
    myGetmusicFetch();
  }, []);

  return (
    <div className="box-principal" data-testid="page-album">
      <Header />
      { musicList.length === 0
        ? <Carregando />
        : <main className="main-album">
          <div className="box-cd">
            <img
              className="cd-capa"
              src={ musicList[0].artworkUrl100 }
              alt="capa do cd"
            />
            <p className="album-name" data-testid="album-name">
              {musicList[0].collectionName}
            </p>
            <p className="artis-name" data-testid="artist-name">
              {musicList[0].artistName}
            </p>
          </div>
          <MusicCard musicList={ musicList } />
        </main>}
    </div>
  );
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
