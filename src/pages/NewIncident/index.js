import React, { useState } from 'react';

import './styles.css';

import logoImg from '../../assets/logo.svg'

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

const NewIncident = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');

  const handleCadastrar = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          authorization: ongId
        }
      });

      history.push('/profile');
    } catch(err) {
      alert("Erro ao incluir caso.")
    }

  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be te hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um heroi para reolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size="16" color="#e02041"/>
              Voltar para home.
          </Link>

        </section>

        <form onSubmit={handleCadastrar}>
          <input value={title} onChange={ e => setTitle(e.target.value)} placeholder="Título do caso"/>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"/>
          <input value={value} onChange={ e => setValue(e.target.value)} placeholder="Valor em reais"/>

          <button className="button" type="submit">Cadastrar</button>

        </form>
      </div>
    </div>
  );
}

export default NewIncident;