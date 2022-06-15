/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-tag-location */
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../styles/profile.css';

function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const myGetUser = async () => {
    setLoading(true);
    const userInfo = await getUser();
    setUser(userInfo);
    setLoading(false);
  };

  useEffect(() => {
    myGetUser();
  }, []);

  return (
    <div className="box-principal-profile" data-testid="page-profile">
      <Header />
      {loading ? <Carregando />
        : <section className="box-profile">
          <div className="box-image">
            {user.image === '' ? <Icon
              className="profile-image"
              icon="healthicons:ui-user-profile-negative"
            />
              : <img
                className="profile-image"
                data-testid="profile-image"
                src={ user.image }
                alt="imagem do usuário"
              />}
            {<Link to="/profile/edit">
              <button
                type="button"
                className="button-profile"
              >
                Editar Perfil
              </button>
            </Link>}
          </div>

          <div className="details">
            <p className="user-name">{`Nome: ${user.name}`}</p>
            <p className="user-email">{`Email: ${user.email}`}</p>
            <p className="user-description">{`Sobre: ${user.description}`}</p>
          </div>
        </section>}
    </div>
  );
}

export default Profile;
