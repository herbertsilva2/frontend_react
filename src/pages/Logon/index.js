import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

const Logon = () => {

  const history = useHistory();

  const handleLogon = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      /** Parte mais importante. Deposita dados no navegador */
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');

    } catch(err) {
        alert(err);
    }
  }

  const [ id, setId ] = useState('');

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the hero"/>

        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={ e => setId(e.target.value) }
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size="16" color="#e02041"/>
              Não tenho cadastro.
          </Link>

        </form>

      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}

export default Logon;