import React from 'react';
import Forms from '../components/Forms';
import logo from '../assets/LOGO_POSITIVA1.svg';
import '../styles/login.css';

function Login() {
  return (
    <div className="div-login" data-testid="page-login">
      <img className="logo" src={ logo } alt="logo trybe tunes" />
      <Forms />
    </div>
  );
}

export default Login;
