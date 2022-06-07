import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

function Forms() {
  const [name, setName] = useState('');
  const [buttonOff, setButtonOff] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [logado, setLogado] = useState(false);
  const NUMBER_NAME = 2;

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setName(value);
    const validate = value.length > NUMBER_NAME;
    if (!validate) {
      setErrorMsg('Nome tem que ser maior que 3 caracteres');
      setButtonOff(true);
    } else {
      setButtonOff(false);
      setErrorMsg('');
    }
  };

  const clicButton = async () => {
    setLoading(true);
    await createUser({ name });
    setLogado(true);
  };

  if (logado) {
    return <Redirect to="/search" />;
  }

  return (
    <form>
      <input
        data-testid="login-name-input"
        type="text"
        name="name"
        id=""
        onChange={ handleChange }
        value={ name }
      />
      <p>{ errorMsg }</p>
      <button
        data-testid="login-submit-button"
        type="button"
        onClick={ clicButton }
        disabled={ buttonOff }
      >
        Entrar
      </button>
      { loading && <Carregando /> }
    </form>
  );
}

export default Forms;
