import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import logoHeader from '../assets/logo_header.svg';
import '../styles/header.css';

function Header() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  const buscaNome = async () => {
    const user = await getUser();
    setUserName(user.name);
    setLoading(false);
  };

  useEffect(() => {
    buscaNome();
  }, []);

  return (
    <header className="header" data-testid="header-component">
      <div className="header-superior">
        <img
          className="logo-header"
          src={ logoHeader }
          alt="logo trybe tunes com fone verde"
        />
        { loading && <Carregando /> }
        <span className="user-name-box" data-testid="header-user-name">
          <Icon className="user-icon" icon="bxs:user-circle" />
          { userName }
        </span>
      </div>
      <div className="header-inferior">
        <Link
          className="link"
          data-testid="link-to-search"
          to="/search"
        >
          Pesquisa
        </Link>
        <Link
          className="link"
          data-testid="link-to-favorites"
          to="/favorites"
        >
          Favoritos
        </Link>
        <Link
          className="link"
          data-testid="link-to-profile"
          to="/profile"
        >
          Perfil
        </Link>
      </div>
    </header>
  );
}

export default Header;
