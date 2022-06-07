import React, { useEffect, useState } from 'react';
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

    </header>
  );
}

export default Header;
