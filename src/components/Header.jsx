import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

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
    <header data-testid="header-component">
      Header
      { loading && <Carregando /> }
      <span data-testid="header-user-name">{ userName }</span>
      <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
      <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
      <Link data-testid="link-to-profile" to="/profile">Perfil</Link>

    </header>
  );
}

export default Header;
