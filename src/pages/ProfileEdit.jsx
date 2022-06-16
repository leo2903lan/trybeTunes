import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { updateUser } from '../services/userAPI';
import '../styles/profileEdit.css';

function ProfileEdit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleImage = (e) => {
    e.preventDefault();
    setImage(e.target.value);
  };

  const onClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateUser({
      name,
      email,
      image,
      description,
    });
    // setLoading(false);
  };

  if (loading) {
    return <Redirect to="/profile" />;
  }

  return (
    <div data-testid="page-profile-edit">
      <Header />
      <form
        className="box-profile-edit"
        onSubmit={ onClick }
      >
        <label htmlFor="name">
          Nome:
          <input
            data-testid="edit-input-name"
            type="text"
            id="name"
            name="Name"
            value={ name }
            onChange={ handleName }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="edit-input-email"
            type="email"
            id="email"
            name="Email"
            value={ email }
            onChange={ handleEmail }
          />
        </label>
        <label htmlFor="description">
          Decrição:
          <textarea
            data-testid="edit-input-description"
            id="description"
            name="Description"
            value={ description }
            onChange={ handleDescription }
          />
        </label>
        <label htmlFor="foto">
          Foto de perfil:
          <input
            placeholder="Digite o endereço da imagem"
            type="text"
            name="Foto"
            id="foto"
            value={ image }
            onChange={ handleImage }
          />
        </label>
        <button className="button-edit" type="submit">Editar</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
