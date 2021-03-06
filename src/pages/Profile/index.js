import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';

const Profile = () => {

  // Variáveis
  const [incidents, setIncidents] = useState([]);
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();


  // Métodos
  useEffect(() => {
    api.get('profile', {
      headers: {
        authorization : ongId
      }
    }).then(response => {
      setIncidents(response.data);
    });
  }, [ongId]);

  const handleDeleteIncident = async (id) => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch(err) {
      alert("Erro ao deletar o caso");
    }
  }

  const handleLogout = () => {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Bem-vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="E02041"></FiPower>
        </button>
      </header>

      <h1>
        Casos Cadastrados
      </h1>

      <ul>
        {incidents.map(incident => (

          <li key={incident.id}>
            <strong>CASO</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>

            <strong>VALOR</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>

        ))}

      </ul>
    </div>
  );
}

export default Profile;